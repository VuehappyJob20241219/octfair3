<template>
  <div>
    <div>
      <template v-if="userInfo.user.userType === 'B'">
        <button @click="handleNewInsert">공고 등록</button>
      </template>
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
          <template
            v-if="HirePost?.MCount > 0 || HirePost.pendingList?.length > 0 || HirePost.approvalList?.length > 0"
          >
            <template v-if="userInfo.user.userType === 'B'">
              <tr v-for="MList in HirePost.MList" v-bind:key="MList.postIdx">
                <td @click="handlerDetail(MList.postIdx)">{{ MList.title }}</td>
                <td>{{ MList.expRequired }}</td>
                <td>{{ MList.postDate }}</td>
                <td>{{ MList.endDate }}</td>
                <td>{{ MList.appStatus }}</td>
                <td>{{ MList.workLocation }}</td>
              </tr>
            </template>
            <template v-if="userInfo.user.userType === 'M' && route.name == 'managePostApproval'">
              <tr v-for="MList in HirePost.pendingList" v-bind:key="MList.postIdx">
                <td @click="handlerDetail(MList.postIdx)">{{ MList.title }}</td>
                <td>{{ MList.expRequired }}</td>
                <td>{{ MList.postDate }}</td>
                <td>{{ MList.endDate }}</td>
                <td>{{ MList.appStatus }}</td>
                <td>{{ MList.workLocation }}</td>
              </tr>
            </template>
            <template v-if="userInfo.user.userType === 'A' || route.name == 'managePost'">
              <tr v-for="MList in HirePost.approvalList" v-bind:key="MList.postIdx">
                <td @click="handlerDetail(MList.postIdx)">{{ MList.title }}</td>
                <td>{{ MList.expRequired }}</td>
                <td>{{ MList.postDate }}</td>
                <td>{{ MList.endDate }}</td>
                <td>{{ MList.appStatus }}</td>
                <td>{{ MList.workLocation }}</td>
              </tr>
            </template>
          </template>
          <template
            v-if="HirePost.MCount == 0 || (HirePost.pendingList?.length == 0 && route.name == 'managePostApproval') 
            || HirePost.approvalList?.length == 0"
          >
            <tr>
              <td colspan="7">채용 공고가 없습니다</td>
            </tr>
          </template>
        </template>
        <template v-if="isError">에러</template>
      </tbody>
    </table>
    <Pagination
      :totalItems="HirePost?.MCount || (route.name == 'managePostApproval' ? HirePost?.pendingPostCnt : HirePost?.approvalPostCnt) || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import axios from "axios";
// import { onMounted } from "vue";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import router from "../../../../router";
import { useUserInfo } from "../../../../stores/userInfo";
import Pagination from "../../../common/Pagination.vue";
import { useBizPostListSearchQuery } from "../../../hook/bizPost/useBizPostListSearchQuery";

const userInfo = useUserInfo();
const queryClient = useQueryClient();
// const HirePost = ref();
const cPage = ref(1);
const route = useRoute();
const injectedValue = inject("bizSearchValue");

// const searchList = async () => {
//   const param = {
//     currentPage: cPage.value.toString(),
//     pageSize: (5).toString(),
//   };
//   if (userInfo.user.userType === "B") {
//     const result = await axios.post("/api/manage-hire/managehireListBody.do", param);
//     return result.data;
//   } else {
//     Object.assign(param, injectedValue.value);
//     console.log(param);
//     const result = await axios.post("/api/manage-post/readPostListBody.do", param);
//     return result.data;
//   }
// };

const {
  data: HirePost,
  isLoading,
  refetch,
  isSuccess,
  isError,
} = useBizPostListSearchQuery(cPage, injectedValue,userInfo.user.userType);

// const {
//   data: HirePost,
//   isLoading,
//   refetch,
//   isSuccess,
//   isError,
// } = useQuery({
//   queryKey: ["HirePost", cPage, injectedValue],
//   queryFn: searchList,
//   // staleTime: 1000 * 60,
// });

const handleNewInsert = () => {
  router.push("bizPostInsert.do");
};

const handlerDetail = (param) => {
  queryClient.removeQueries({
    queryKey: ["bizPostDetail"],
  });
  router.push({ name: "bizPostDetail", params: { postIdx: param } });
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
