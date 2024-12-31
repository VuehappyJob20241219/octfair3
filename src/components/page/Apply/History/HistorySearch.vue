<template>
  <div class="search-box">
    <select v-model="searchKey.startDate">
        <option value="all">조회기간전체</option>
        <option value="1week">지난 1주일</option>
        <option value="1month">지난 1개월</option>
        <option value="3month">지난 3개월</option>
        <option value="6month">지난 6개월</option>
        <option value="1year">지난 1년</option>
    </select>
    <select v-model="searchKey.viewStatus">
        <option value="all">열람여부전체</option>
        <option value="1">열람</option>
        <option value="0">미열람</option>
    </select>
    <select v-model="searchKey.sortOrder">
        <option value="desc">최근지원순</option>
        <option value="asc">과거지원순</option>
    </select>
    <input v-model="searchKey.keyWord"/>

    <button @click="handlerSearch">검색</button>
    <button @click="handlerReset">초기화</button>
  </div>
</template>
<script setup>
import { inject } from 'vue';

const injectValue = inject("provideValue");
// 부모 컴포넌트에서 제공한 defaultSearchKey를 inject()로 받아옴
const defaultSearchKey = inject("defaultSearchKey");
// searchKey를 기본값으로 초기화
const searchKey = ref({ ...injectValue.value });

const handlerSearch = () => {
  injectValue.value = { ...searchKey.value };
}

//검색어, 검색결과 초기화
const handlerReset = () => {
  searchKey.value = { ...defaultSearchKey };
  injectValue.value = { ...searchKey.value };
}

</script>

<style lang="scss" scoped>
.search-box {
  margin-bottom: 10px;
  display: block;
  float: inline-end;
}

select {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: border-color 0.3s;

  &:hover {
    border-color: #3bb2ea;
  }

  &:focus {
    outline: none;
    border-color: #3bb2ea;
    box-shadow: 0 0 5px rgba(59, 178, 234, 0.5);
  }
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



<!-- import router from "@/router";
import { useModalStore } from "@/stores/modalState";

const keyword = ref("");
const searchStartDate = ref("");
const searchEndDate = ref("");
const modalState = useModalStore();

const handlerSearch = () => {
  const query = [];
  !keyword.value || query.push(`searchTitle=${keyword.value}`);
  !searchStartDate.value || query.push(`searchStDate=${searchStartDate.value}`);
  !searchEndDate.value || query.push(`searchEdDate=${searchEndDate.value}`);
  const queryString = query.length > 0 ? `?${query.join("&")}` : "";

  router.push(queryString);
};

const handlerModal = () => {
  modalState.setModalState();
};

// 인자로 받는 함수안에 반응형 객체 (ref같은거)가 있으면, 객체가 변경될 때 마다, 해당 변수를 실행 시켜줌
// 근데, 밑에 watchEffect는 ref같은거 없어요. 그래서 그냥 새로고침 누르면 최초에 한 번 실행되는 거입니다.
watchEffect(
  () =>
    window.location.search &&
    router.push(window.location.pathname, { replace: true })
); -->