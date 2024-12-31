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
          <th scope="col" colspan="3" style="text-align: left">지원자 O명</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="applicantList">
          <template v-for="list in applicantList" :key="list.resIdx">
            <tr>
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
                <div><button>지원자 이력서 보기</button></div>
                <div><button>합격</button> <button>불합격</button></div>
              </td>
            </tr>
          </template>
        </template>
        <template v-else>
          <tr>
            <td colspan="7">일치하는 검색 결과가 없습니다</td>
          </tr>
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
const cPage = ref(1);
const applicantList = ref();

const loadApplicantList = async () => {
  const param = new URLSearchParams({});
  await axios
    .post("/api/manage-hire/applicantListBody.do", {
      loginId: userInfo.user.loginId,
      postIdx: "22",
      keyword: "서류심사중",
      startSeq: "1",
      pageSize: "5",
      currentPage: "1",
    })
    .then((res) => {
      applicantList.value = res.data.list;
    });
};

onMounted(() => {
  // loadApplicantList();
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
