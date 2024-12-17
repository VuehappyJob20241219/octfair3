<template>
  <div class="search-box">
    <input v-model.lazy="keyword" />
    <input type="date" v-model="searchStartDate" />
    <input type="date" v-model="searchEndtDate" />
    <button @click="handlerSearch">검색</button>
    <button @click="handlerModal">신규등록</button>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import router from "../../../../router";
import { useModalStore } from "../../../../stores/modalState";

const modalStateNotice = useModalStore();
const keyword = ref("");
const searchStartDate = ref("");
const searchEndtDate = ref("");

const handlerSearch = () => {
  //1. url 파라미터 쿼리
  const query = [];
  !keyword.value || query.push(`searchTitle=${keyword.value}`);
  !searchStartDate.value || query.push(`searchStDate=${searchStartDate.value}`);
  !searchEndtDate.value || query.push(`searchEdDate=${searchEndtDate.value}`);

  const queryString = query.length > 0 ? `?${query.join(`&`)}` : ``;

  router.push(queryString);
};

// 인자로 받는 함수 안에 반응형 객체(ref 같은거)가 있으면, 객체가 변경될 때 마다, 해당 함수를 실행 시켜줌
// 근데. 밑에 watchEffect는 ref같은게 없어요 그래서 그냥 새로고침 누르면 최초에 한 번 실행되는 것
watchEffect(() => window.location.search && router.push(window.location.pathname, { replace: true }));

const handlerModal = () => {
  modalStateNotice.setModalState();
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
