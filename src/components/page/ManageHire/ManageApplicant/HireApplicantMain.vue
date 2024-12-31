<template>
  <div class="applicantList">
    <!-- <NoticeModal
      v-if="modalState.modalState"
      @postSuccess="searchList"
      @modalClose="() => (noticeIdx = 0)"
      :idx="noticeIdx"
    /> -->
<<<<<<< HEAD
    현재 페이지: {{ cPage }} 총 개수: {{ ApplicantList?.ApplicantCount }}
    <table>
      <colgroup>
        <col width="10%" />
        <col width="40%" />
        <col width="20%" />
        <col width="30%" />
=======
    <!-- 현재 페이지: {{ cPage }} 총 개수: {{ ApplicantList?.ApplicantCount }} -->
    <table>
      <colgroup>
        <col width="50%" />
        <col width="30%" />
        <col width="20%" />
>>>>>>> 6ccbee06a592cd71e9fd7bbb3c80c81e210494e4
      </colgroup>

      <thead>
        <tr>
<<<<<<< HEAD
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
=======
          <th scope="col" colspan="3" style="text-align: left">지원자 O명</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="applicantList">
          <template v-for="list in applicantList" :key="list.resIdx">
            <tr>
              <td rowspan="4">
                <div>{{ list.name }}</div>
                <div>{{ list.resTitle }}</div>
                <div>{{ list.applyDate.substring(0, 10) }}</div>
              </td>
            </tr>
            <tr>
              <td rowspan="4">
                <div>학력: {{ list.grdStatus }}</div>
                <div>전화번호: {{ list.phone }}</div>
                <div>이메일: {{ list.email }}</div>
              </td>
            </tr>
            <tr>
              <td rowspan="2">
                <button>지원자 이력서 보기</button>
              </td>
              <td rowspan="2">
                <button>합격</button>
                <button>불합격</button>
              </td>
            </tr>
          </template>
        </template>
        <template v-else>
          <tr>
            <td colspan="7">일치하는 검색 결과가 없습니다</td>
          </tr>
        </template>
>>>>>>> 6ccbee06a592cd71e9fd7bbb3c80c81e210494e4
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
<<<<<<< HEAD

const searchList = () => {
  const param = new URLSearchParams({});
  axios.post("/api/manage-hire/applicantListBody.do").then((res) => {
    ApplicantList.value = res.data.value;
  });
};

onBeforeMount(() => {
=======
import { useUserInfo } from "../../../../stores/userInfo";

const userInfo = useUserInfo();
const cPage = ref(1);
const applicantList = ref();

const searchList = async () => {
  const param = new URLSearchParams({});
  await axios
    .post("/api/manage-hire/applicantListBody.do", {
      loginId: userInfo.user.loginId,
      postIdx: 22,
      keyword: "서류심사중",
      startSeq: 1,
      pageSize: "5",
      currentPage: "1",
    })
    .then((res) => {
      applicantList.value = res.data.list;
    });
};

onMounted(() => {
>>>>>>> 6ccbee06a592cd71e9fd7bbb3c80c81e210494e4
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
