<template>
  <div class="search-box">
    <input v-model="searchKey.searchTitle" />
    <input type="date" v-model="searchKey.searchStDate" @change="checkSearchDate"/>
    <input type="date" v-model="searchKey.searchEdDate" @change="checkSearchDate"/>
    <button @click="handlerSearch">검색</button>
    <button @click="handlerInsert" v-if="userInfo.user.userType==='M'">신규등록</button>
  </div>
</template>
<script setup>
import router from "@/router";
import { useUserInfo } from "../../../../stores/userInfo";
import { useQueryClient } from "@tanstack/vue-query";
import { inject, ref } from "vue";

const userInfo= useUserInfo();
const queryClient = useQueryClient();
const injectValue = inject('provideValue');
const searchKey = ref({});

const handlerSearch = () =>{
  injectValue.value={...searchKey.value};
}

const checkSearchDate = () =>{
  if (new Date(searchKey.value.searchEndDate) < new Date(searchKey.value.searchStartDate)) {
  alert("종료일자는 시작일자보다 나중이어야 합니다.");
  return;
  }
}

const handlerInsert = () => {
  queryClient.removeQueries({
    queryKey: ["faqDetail"],
  });
  router.push("faq.do/insert");
};
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
