<template>
  <div class="divResumeList">
    현재 페이지:{{ cPage }} 총 개수: {{ resumeList?.resumeCnt }}
    <table>
      <colgroup>
        <col width="50%" />
        <col width="30%" />
        <col width="20%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">이력서 제목</th>
          <th scope="col">관리</th>
          <th scope="col">최종 수정일</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="resumeList">
          <template v-if="resumeList.resumeCnt > 0">
            <tr v-for="resume in resumeList.resumeList" :key="resume.resIdx">
              <td>{{ resume.resTitle }}</td>
              <td>
                <button class="copy-button">복사하기</button>
                <button class="delete-button">삭제하기</button>
              </td>
              <td>{{ resume.updatedDate }}</td>
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
    <Pagination
      :totalItems="resumeList?.resumeCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="resumeSearchList"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { useUserInfo } from "../../../../stores/userInfo";
import { onMounted, ref } from "vue";
import Pagination from "../../../common/Pagination.vue";

const userInfo = useUserInfo();
const { user } = userInfo;
const resumeList = ref();
const cPage = ref(1);

const resumeSearchList = async () => {
  const param = {
    loginId: user.loginId,
    userNm: user.userNm,
    userType: user.userType,
    currentPage: cPage.value,
    pageSize: 5,
  };
  await axios
    .post("/api/apply/resumeListBody.do", param)
    .then((res) => {
      resumeList.value = res.data;
      console.log("값 확인", resumeList.value); // 데이터 로드 후 로그 출
    })
    .catch((error) => {
      console.error("데이터 로드 중 오류 발생:", error);
    });
};

onMounted(() => {
  resumeSearchList();
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

  .copy-button {
    background-color: #39b0e8; /* 초록색 */
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
  }

  .delete-button {
    background-color: #718da7; /* 빨간색 */
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
  }

  button:hover {
    opacity: 0.9;
  }
}
</style>
