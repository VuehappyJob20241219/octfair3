<template>
  <div class="search-box">
    <input v-model.lazy="searchTitle" />
    <input type="date" v-model="searchStartDate" />
    <input type="date" v-model="searchEndDate" />
    <button v-on:click="handlerSearch">검색</button>
    <button v-if="userType === 'A' || userType === 'B'" @click="handlerLogState">내가 쓴 글</button>
  </div>
</template>

<script setup>
import router from "@/router";
import { useModalStore } from "../../../../stores/modalState";
import { useUserInfo } from "../../../../stores/userInfo";
import { useQnaLogState } from "../../../../stores/useQnaLogState";

const searchTitle = ref("");
const searchStartDate = ref("");
const searchEndDate = ref("");
const modalStore = useModalStore();
const userInfo = useUserInfo();
const userType = userInfo.user.userType;
const qnaStore = useQnaLogState();
const injectedSearchValue = inject("providedSearchValue");
const injectedhRequestType = inject("providedRequestType");

const handlerSearch = () => {
  const query = [];
  !searchTitle.value || query.push(`searchTitle=${searchTitle.value}`);
  !searchStartDate.value || query.push(`searchStDate=${searchStartDate.value}`);
  !searchEndDate.value || query.push(`searchEdDate=${searchEndDate.value}`);
  const queryString = query.length > 0 ? `?${query.join("&")}` : "";

  router.push(queryString);
};

const handlerSearchKewordBtn = () => {
  injectedSearchValue.value = { ...searchKey.value };
};

const handlerLogState = () => {
  injectedhRequestType.requestType = "my";
};

watchEffect(() => window.location.search && router.push()); // URL이 변경되면 리셋
</script>

<style lang="scss" scoped>
.search-box {
  margin-bottom: 10px;
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
