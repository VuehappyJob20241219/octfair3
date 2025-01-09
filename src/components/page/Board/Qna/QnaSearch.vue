<template>
  <div class="search-box">
    <input v-model.lazy="searchTitle" />
    <input type="date" v-model="searchStartDate" />
    <input type="date" v-model="searchEndDate" />
    <button @click="handlerSearch">검색</button>
    <button v-if="userType === 'A' || userType === 'B'" @click="handlerSaveBtn">등록하기</button>
    <button v-if="userType === 'A' || userType === 'B'" @click="handlerLogState">내가 쓴 글</button>
  </div>
</template>

<script setup>
import { useQueryClient } from "@tanstack/vue-query";
import router from "@/router";
import { useUserInfo } from "../../../../stores/userInfo";

const emits = defineEmits(["saveBtn"]);
const searchTitle = ref("");
const searchStartDate = ref("");
const searchEndDate = ref("");
const userInfo = useUserInfo();
const userType = userInfo.user.userType;
const injectedhRequestType = inject("providedRequestType");
const injectedSaveState = inject("providedSaveState");
const queryClient = useQueryClient();

const handlerSearch = () => {
  if (new Date(searchEndDate.value) < new Date(searchStartDate.value)) {
  alert("종료일자는 시작일자보다 나중이어야 합니다.");
  return;
  }
  if (new Date(searchEndDate.value) < new Date(searchStartDate.value)) {
  alert("종료일자는 시작일자보다 나중이어야 합니다.");
  return;
  }
  const query = [];
  !searchTitle.value || query.push(`searchTitle=${searchTitle.value}`);
  !searchStartDate.value || query.push(`searchStDate=${searchStartDate.value}`);
  !searchEndDate.value || query.push(`searchEdDate=${searchEndDate.value}`);
  const queryString = query.length > 0 ? `?${query.join("&")}` : "";

  router.push(queryString);
};


const handlerLogState = () => {
  injectedhRequestType.requestType = "my";
};

const handlerSaveBtn = () => {
  queryClient.removeQueries({
    queryKey: ["qnaDetail"],
  });
  injectedSaveState.saveState = true;
};

</script>

<style lang="scss" scoped>
.search-box {
  margin-top: 8px;
  display: block;
  float: inline-end;
}

input {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
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
