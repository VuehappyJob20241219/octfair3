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
        <col width="10%" />
        <col width="40%" />
        <col width="20%" />
        <col width="30%" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">이력서 제목</th>
          <th scope="col">지원자 이름</th>
          <th scope="col">지원자 이메일</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="ApplicantList">
          <template v-if="ApplicantList.ApplicantCount > 0">
            <tr v-for="list in ApplicantList.value" :key="list.resIdx">
              <td>{{ list.resIdx }}</td>
              <td>{{ list.resTitle }}</td>
              <td>{{ list.name }}</td>
              <td>{{ list.email }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7">일치하는 검색 결과가 없습니다</td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <!-- <Pagination
      :totalItems="noticeList?.noticeCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    /> -->
  </div>
</template>

<script setup>
import axios from "axios";
import { useUserInfo } from "../../../../stores/userInfo";

const userInfo = useUserInfo();

const searchList = () => {
  const param = new URLSearchParams({});
  axios.post("/api/manage-hire/applicantListBody.do", { loginId: userInfo.user.loginId, postIdx: 22 }).then((res) => {
    ApplicantList.value = res.data.list;
  });
};

onMounted(() => {
  searchList();
});
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
</style>
