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
        <!-- 검색 결과 표시 -->
        <template v-if="qnaList">
          <template v-if="qnaList.qnaCnt > 0">
            <tr v-for="qna in qnaList.qna" :key="qna.qnaIdx" @click="handlerModal(qna.qnaIdx)">
              <td>{{ qna.qnaIdx }}</td>
              <td>{{ qna.title }}</td>
              <td>{{ qna.createdDate.substr(0, 10) }}</td>
              <td>{{ qna.author }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="4">일치하는 검색 결과가 없습니다</td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <Pagination
      :totalItems="qnaList?.qnaCnt || 0"
      :items-per-page="itemPerPage"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    />

    <!-- 모달 -->
    <QnaPassword v-if="modal.modalState" :idx="qnaIdx" @postSuccess="searchList" @modalClose="() => (qnaIdx = 0)" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Pagination from "../../../common/Pagination.vue";
import QnaDetail from "./QnaDetail.vue";
import { useUserInfo } from "../../../../stores/userInfo";
import { useQnaLogState } from "../../../../stores/useQnaLogState";
import { inject } from "vue";
import { useModalStore } from "../../../../stores/modalState";
import QnaPassword from "./QnaPassword.vue";

// 상태 값 설정
const route = useRoute();
const itemPerPage = ref(10);
const qnaList = ref();
const cPage = ref(1);
const qnaIdx = ref(0);
const modal = useModalStore();
const userInfo = useUserInfo();
const qnaLogState = useQnaLogState();
const injectedhRequestType = inject("providedRequestType");

// 활성 버튼 상태 (디폴트: 일반회원)
const activeButton = ref("A");

// 버튼 활성화 함수
const setActive = (type) => {
  injectedhRequestType.requestType = "all";
  activeButton.value = type; // 클릭된 버튼 활성화

  searchList(); // 상태 변경 시 API 호출
};

// 검색 API 호출
const searchList = () => {
  const param = {
    searchTitle: route.query.searchTitle || "",
    searchStDate: route.query.searchStDate || "",
    searchEdDate: route.query.searchEdDate || "",
    qna_type: activeButton.value, // 활성 버튼 값 포함
    currentPage: cPage.value.toString(),
    pageSize: itemPerPage.value.toString(),
    loginId: userInfo.user.loginId,
    requestType: injectedhRequestType.requestType || "all", // 프로바이더 값 사용
  };
  axios.post("/api/board/qnaListRe.do", param).then((res) => {
    qnaList.value = res.data;
  });
};

// 모달 처리
const handlerModal = (idx) => {
  setModalState();
  console.log("modalState", modal.modalState);
  qnaIdx.value = idx;
};

const closeModal = () => {
  qnaIdx.value = 0;
  modal.setModalState(false);
};

const setModalState = () => {
  console.log("여기는 타나?");
  modal.setModalState(); // 현재 값을 반대로 토글
};

// 초기화
onMounted(() => {
  searchList();
});
watch(route, qnaLogState, searchList, injectedhRequestType.requestType);

watchEffect(() => {
  searchList();
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
