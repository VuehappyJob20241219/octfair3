<template>
  <div class="applicantList">
    <!-- <NoticeModal
      v-if="modalState.modalState"
      @postSuccess="searchList"
      @modalClose="() => (noticeIdx = 0)"
      :idx="noticeIdx"
    /> -->
    <!-- 현재 페이지: {{ cPage }} 총 개수: {{ ApplicantList?.ApplicantCount }} -->
    <table>
      <colgroup>
        <col width="50%" />
        <col width="30%" />
        <col width="20%" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col" colspan="3" style="text-align: left">지원자 {{ applicantCnt }}명</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="applicantList">
          <tr v-for="list in applicantList" :key="list.appId">
            <td>
              <div>{{ list.name }}</div>
              <div>{{ list.resTitle }}</div>
              <div>{{ list.applyDate.substring(0, 10) }}</div>
            </td>
            <td>
              <div>학력: {{ list.grdStatus }}</div>
              <div>전화번호: {{ list.phone }}</div>
              <div>이메일: {{ list.email }}</div>
            </td>
            <td>
              <div><button @click="handlerResume(list.resIdx)" style="width: 150px">지원자 이력서 보기</button></div>
              <div><button @click="updateProcPass(list.appId)">합격</button> <button>불합격</button></div>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="7">일치하는 검색 결과가 없습니다</td>
          </tr>
        </template>
      </tbody>
    </table>
    <Pagination
      :totalItems="applicantList?.applicantCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="loadApplicantList"
      v-model="cPage"
    />

    <ResumePreview v-if="modalStore.modalState" :idx="selectedResumeIdx"></ResumePreview>
  </div>
</template>

<script setup>
import axios from "axios";
import Pagination from "../../../common/Pagination.vue";
import { inject, watch } from "vue";
import { useModalStore } from "../../../../stores/modalState";
import { useUserInfo } from "../../../../stores/userInfo";
import ResumePreview from "../../Apply/ResumeDetail/ResumePreview.vue";

const cPage = ref(1);
const applicantList = ref();
const userInfo = useUserInfo();
const injectedValue = inject("providedValue");
const modalStore = useModalStore();
const selectedResumeIdx = ref(null);
const applicantCnt = ref();

const loadApplicantList = () => {
  // console.log("main에서 injectedValue.posIdx ==>" + injectedValue.value.postIdx);
  // console.log("main에서 injectedValue.keyword ==>" + injectedValue.value.keyword);
  // console.log("main에서 injectedValue.procArry ==>" + injectedValue.value.procArry);
  const params = {
    ...injectedValue.value,
    loginId: userInfo.user.loginId,
    firstProc: "abc",
    pageSize: "5",
    currentPage: "1",
  };

  axios.post("/api/manage-hire/applicantListBody.do", params).then((res) => {
    applicantList.value = res.data.list;
    applicantCnt.value = res.data.count;
  });
};

// const currentStatus

const updateProcPass = (idx) => {
  const param = { appId: idx };
  console.log("appId ==>" + param.appId);
  console.log("현재 채용절차 ==> " + injectedValue.value.procArry);
  // const nextStatus = procArry[index + 1];
  // axios.post("/api/manage-hire/statusUpdateBody.do", param);
};

const handlerResume = (param) => {
  selectedResumeIdx.value = param;
  modalStore.setModalState();
};

watch([injectedValue], () => loadApplicantList());

// onMounted(() => {
//   loadApplicantList();
//   // if (injectedValue.value) {
//   //   console.log("main에서 받은 injectedValue ==>" + injectedValue.value.postIdx);
//   //   console.log("main에서 받은 injectedValue ==>" + injectedValue.value.keyword);
//   // }
// });
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px 0px 0px;
  font-size: 18px;
  text-align: left;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #2676bf;
    color: #ddd;
  }

  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #d3d3d3;
    opacity: 0.9;
    cursor: pointer;
  }
}

button {
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: none;
  color: white;
  width: 70px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px #999;
  background-color: #3bb2ea;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}
</style>
