<template>
  <div>
    <div>
      <button @click="handleNewInsert">공고 등록</button>
    </div>
    <table>
      <colgroup>
        <col width="30%" />
        <col width="10%" />
        <col width="15%" />
        <col width="15%" />
        <col width="10%" />
        <col width="20%" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col">공고제목</th>
          <th scope="col">경력 사항</th>
          <th scope="col">게시일</th>
          <th scope="col">마감일</th>
          <th scope="col">승인 여부</th>
          <th scope="col">근무 지역</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">...로딩중</template>
        <template v-if="isSuccess">
          <template v-if="HirePost.MCount > 0">
            <tr v-for="MList in HirePost.MList" v-bind:key="MList.postIdx">
              <td @click="handlerDetail(MList.postIdx)">{{ MList.title }}</td>
              <td>{{ MList.expRequired }}</td>
              <td>{{ MList.postDate.split(" ")[0] }}</td>
              <td>{{ MList.endDate.split(" ")[0] }}</td>
              <td>{{ MList.appStatus }}</td>
              <td>{{ MList.workLocation }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7">채용 공고가 없습니다</td>
            </tr>
          </template>
        </template>
        <template v-if="isError">에러</template>
      </tbody>
    </table>
    <Pagination
      :totalItems="HirePost?.MCount || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import axios from "axios";
// import { onMounted } from "vue";
import Pagination from "../../../common/Pagination.vue";
import { useQuery } from "@tanstack/vue-query";
import { useQueryClient } from "@tanstack/vue-query";
import router from "../../../../router";
const queryClient = useQueryClient();

// const HirePost = ref();
const cPage = ref(1);

const searchList = async () => {
  const param = new URLSearchParams({
    currentPage: cPage.value,
    pageSize: 5,
  });
  const result = await axios.post(
    "/api/manage-hire/managehireListBody.do",
    param,
  );
  return result.data;
};

const {
  data: HirePost,
  isLoading,
  refetch,
  isSuccess,
  isError,
} = useQuery({
  queryKey: ["HirePost", cPage],
  queryFn: searchList,
  staleTime: 1000 * 60,
});

const handleNewInsert = () => {
  router.push("post.do/insert");
};

const handlerDetail = (param) => {
  // queryClient.removeQueries({
  //   queryKey: ["HirePost"],
  // });
  router.push({ name: "BizPostDetail", params: { idx: param } });
};
</script>

<style lang="scss" scoped>
button {
  display: inline-block;
  padding-right: 10px;
  min-width: 80px;
  height: 31px;
  line-height: 31px;
  font-family: "나눔바른고딕", NanumBarunGothic;
  font-size: 15px;
  color: #fff;
  text-align: center;
  font-weight: 400;
  background-color: gray;
  margin: 10px;
}
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
