<template>
  <div class="divNoticeList">
    <!-- 현재 페이지 및 총 개수 표시 -->
    현재 페이지: {{ cPage }} 총 개수: {{ qnaList?.qnaCnt || 0 }}

    <!-- 버튼 -->
    <div>
      <button class="qnaButton" :class="{ active: activeButton === 'A' }" @click="setActive('A')">일반회원</button>
      <button class="qnaButton" :class="{ active: activeButton === 'B' }" @click="setActive('B')">기업회원</button>
    </div>

    <!-- 테이블 -->
    <table>
      <colgroup>
        <col width="10%" />
        <col width="50%" />
        <col width="30%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성일</th>
          <th scope="col">작성자</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">
          <tr>
            <td colspan="4">로딩중...</td>
          </tr>
        </template>
        <!-- 검색 결과 표시 -->
        <template v-if="qnaList">
          <template v-if="qnaList.qnaCnt > 0">
            <tr v-for="qna in qnaList.qna" :key="qna.qnaIdx" @click="handlerModal(qna.qnaIdx)">
              <td>{{ qna.qnaIdx }}</td>
              <td>
                {{ qna.title }}
                <span
                  v-if="qna?.ans_content"
                  :style="{
                    marginLeft: '8px',
                    display: 'inline-block',
                    padding: '4px 8px',
                    backgroundColor: '#e6f7ff',
                    borderRadius: '4px',
                  }"
                >
                  답변 완료
                </span>
              </td>
              <td>{{ qna.createdDate.substr(0, 10) }}</td>
              <td>{{ qna.author }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="4">일치하는 검색 결과가 없습니다</td>
            </tr>
          </template>
          <template v-if="isError">오류가 발생하였습니다.</template>
        </template>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <Pagination
      :totalItems="qnaList?.qnaCnt || 0"
      :items-per-page="itemPerPage"
      :max-pages-shown="5"
      v-model="cPage"
    />

    <!-- 모달 -->
    <!-- userType이 "M"인 경우 QnaPassword, 그렇지 않으면 QnaDetail -->
    <QnaDetail
      v-if="(userInfo.user.userType === 'M' && modal.modalState) || injectedSaveState.saveState || passModalState"
      :idx="qnaIdx"
      :password="pass"
      @close="closeModal"
      @postSuccess="() => refetch()"
    />
    <QnaPassword
      v-else-if="qnaIdx > 0 && modal.modalState"
      :idx="qnaIdx"
      @passwordValue="handlePasswordValue"
      @passwordModalState="hanlerPassState"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref} from "vue";
import { useRoute } from "vue-router";
import Pagination from "../../../common/Pagination.vue";
import QnaDetail from "./QnaDetail.vue";
import QnaPassword from "./QnaPassword.vue";
import { useQnaListGetQuery } from "../../../hook/qna/useQnaListGetQuery";

// 상태 값 설정
const route = useRoute();
const itemPerPage = ref(5);
const cPage = ref(1);
const qnaIdx = ref(0);
const pass = ref("");
const modal = useModalStore();
const userInfo = useUserInfo();
const qnaLogState = useQnaLogState();
const injectedhRequestType = inject("providedRequestType");
const injectedSaveState = inject("providedSaveState");
const passModalState = ref(false);

// 활성 버튼 상태 
const activeButton = ref("");
if(userInfo.user.userType === 'A'){
  activeButton.value = "A";
}else if(userInfo.user.userType === 'B'){
  activeButton.value = "B";
}else{
  activeButton.value = "A";
}

if(injectedhRequestType.requestType ==="my"){
  refetch();
}

// 버튼 활성화 함수
const setActive = (type) => {
  injectedhRequestType.requestType = "all";
  activeButton.value = type; // 클릭된 버튼 활성화
  refetch();
};


const {
  data: qnaList,
  isLoading,
  refetch,
  isSuccess,
  isError,
} = useQnaListGetQuery(route, activeButton, cPage, itemPerPage, 
userInfo.user.loginId, injectedhRequestType, qnaLogState, injectedSaveState);

// pass컴포넌트에서 받은 값 저장하기
const handlePasswordValue = (data) => {
  if (data != null) {
    qnaIdx.value = data.idx;
    pass.value = data.password;
  }
};
const hanlerPassState = (date) => {
  passModalState.value = date;
};

// 모달 처리
const handlerModal = (idx) => {
  setModalState();
  qnaIdx.value = idx;
};

const closeModal = () => {
  if (passModalState.value) {
    passModalState.value = false;
    qnaIdx.value = 0;
    pass.value = "";
  }
  if (modal.modalState) {
    modal.setModalState(false);
    qnaIdx.value = 0;
  }
  if (injectedSaveState.saveState) {
    injectedSaveState.saveState = false;
    qnaIdx.value = 0;
  }
};

const setModalState = () => {
  modal.setModalState(); // 현재 값을 반대로 토글
};

watchEffect(() => {
  // watchEffect는 route.query가 변경되면 자동으로 실행됩니다.
  if (Object.keys(route.query).length >0) {
    refetch(); // query가 변경될 때마다 수동으로 refetch 호출
  }
});

</script>

<style lang="scss" scoped>
.divNoticeList {
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 18px;

    th,
    td {
      padding: 8px;
      border-bottom: 1px solid #ddd;
      text-align: center;
    }

    th {
      background-color: #2676bf;
      color: #ddd;
    }

    tbody tr:hover {
      background-color: #d3d3d3;
      opacity: 0.9;
      cursor: pointer;
    }
  }

  .qnaButton {
    margin-top: 10px;
    font-size: 15px;
    width: 100px;
    padding: 10px;
    margin-right: 6px;
    background-color: #7a96b0;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.active {
      background-color: #37aee5;
    }

    &:hover {
      background-color: #6f8ba9;
    }

    &.active:hover {
      background-color: #37aee5;
    }
  }
}
</style>
