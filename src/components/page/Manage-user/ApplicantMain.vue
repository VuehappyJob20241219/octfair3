<template>
  <ApplicantModal v-if="modalStateApplicant.modalState" @postSuccess="searchList" @modalClose="() => (loginId = 0)"
    :loginId="loginId" />
  <div class="applicantList">
    <table>
      <colgroup>
        <col width="15%" />
        <col width="10%" />
        <col width="10%" />
        <col width="25%" />
        <col width="20%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">회원번호</th>
          <th scope="col">회원ID</th>
          <th scope="col">회원명</th>
          <th scope="col">이메일</th>
          <th scope="col">회원가입날짜</th>
          <th scope="col">관리</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="applicantList">
          <template v-if="applicantList.applicantCnt > 0">
            <tr v-for="applicant in applicantList.applicant" v-bind:key="applicant.userIdx">
              <td>{{ applicant.userIdx }}</td>
              <td>{{ applicant.loginId }}</td>
              <td>{{ applicant.name }}</td>
              <td>{{ applicant.email }}</td>
              <td>{{ applicant.regdate }}</td>
              <td>
                <div class="button-box">
                  <button @click="handlerModal(applicant.loginId)">수정</button>
                </div>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <Pagination :totalItems="applicantList?.applicantCnt || 0" :items-per-page="5" :max-pages-shown="5"
      :onClick="searchList" v-model="cPage" />
  </div>
</template>

<script setup>
import { useModalStore } from "../../../stores/modalState";
import Pagination from "../../common/Pagination.vue";
import { useApplicantListSearchQuery } from "../../hook/applicant/useApplicantListSearchQuery";


const cPage = ref(1);
const modalStateApplicant = useModalStore();
const loginId = ref("");
const injectedValue = inject("provideValue");

const {
  data: applicantList,
  isLoading,
  isSuccess,
  isLoadingError,
  isError,
  refetch,
} = useApplicantListSearchQuery(injectedValue, cPage);

const handlerModal = (id) => {
  loginId.value = id;
  modalStateApplicant.setModalState();
};

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
    text-align: center;
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

.button-box {
  text-align: middle;
  margin-top: 0px;
}

button {
  background-color: #3bb2ea;
  border: none;
  color: white;
  padding: 5px 5px;
  text-align: right;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 1px 1px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px #999;
  transition: 0.3s;

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
