<template>
  <div class="applicantList">
    <table>
      <colgroup>
        <col width="40%" />
        <col width="25%" />
        <col width="15%" />
        <col width="20%" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col" colspan="4" style="text-align: left">지원자 {{ applicantCnt }}명</th>
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
              <div>
                <b-button
                  variant="outline-success"
                  @click="handlerResume({ resIdx: list.resIdx, appId: list.appId })"
                  style="width: 130px"
                >
                  이력서 보기
                </b-button>
              </div>
            </td>
            <td>
              <div v-if="nowStageName !== '최종합격' && list.viewed === 1">
                <b-button variant="primary" @click="updateProcPass(list.appId)" class="passfailbtn">{{
                  nowStageName !== "불합격" ? "합격" : "추가합격"
                }}</b-button>
                <span v-if="nowStageName !== '불합격'">
                  <b-button variant="danger" @click="updateProcFail(list.appId)" class="passfailbtn">불합격</b-button>
                </span>
              </div>
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
      :totalItems="applicantCnt || 0"
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
import { ManageJobApplicant } from "../../../../api/axiosApi/companyApi";
import { BButton } from "bootstrap-vue-3";

const cPage = ref(1);
const applicantList = ref();
const userInfo = useUserInfo();
const injectedValue = inject("providedValue");
const modalStore = useModalStore();
const selectedResumeIdx = ref(null);
const applicantCnt = ref();
const currentStage = ref();
const nextStage = ref();
const beforeStage = ref();
const nowStageName = ref();

// console.log("현재페이지 ===> " + cPage.value);

const loadApplicantList = () => {
  currentStage.value = injectedValue.value.procArry.findIndex((stage) => stage === injectedValue.value.keyword);
  nowStageName.value = injectedValue.value.keyword;
  const params = {
    ...injectedValue.value,
    loginId: userInfo.user.loginId,
    firstProc: injectedValue.value.procArry[0],
    pageSize: "5",
    currentPage: cPage.value.toString(),
  };

  axios.post(ManageJobApplicant.SearchList, params).then((res) => {
    applicantList.value = res.data.list;
    applicantCnt.value = res.data.count;
  });
};

const updateProcPass = (idx) => {
  if (currentStage.value < injectedValue.value.procArry.length - 1) {
    nextStage.value = injectedValue.value.procArry[currentStage.value + 1];
  } else if (currentStage.value === injectedValue.value.procArry.length - 1) {
    nextStage.value = "최종합격";
  } else if (injectedValue.value.keyword === "불합격") {
    nextStage.value = injectedValue.value.procArry[0];
    alert("첫번째 채용절차로 넘어갑니다.");
  } else {
    alert("합격에 실패했습니다.");
  }
  axios.post(ManageJobApplicant.UpdateProcStatus, { appId: idx, keyword: nextStage.value }).then(() => {
    loadApplicantList();
  });
};

const updateProcFail = (idx) => {
  if (currentStage.value >= 0) {
    beforeStage.value = "불합격";
  } else {
    alert("불합격에 실패했습니다.");
  }
  axios.post(ManageJobApplicant.UpdateProcStatus, { appId: idx, keyword: beforeStage.value }).then(() => {
    loadApplicantList();
  });
};

const handlerResume = (param) => {
  selectedResumeIdx.value = param.resIdx;
  modalStore.setModalState();
  axios.post(ManageJobApplicant.UpdateViewStatus, { appId: param.appId }).then(() => {
    loadApplicantList();
  });
};

watch([injectedValue], () => loadApplicantList());
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
.passfailbtn {
  width: 100px;
  margin-right: 10px;
}

/*button {
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
}*/
</style>
