<template>
  <ContextBox>입사지원 내역</ContextBox>
  <HistorySearch/>
  <HistoryMain/>
  
</template>

<script setup>


//초기 검색 조건 설정
const defaultSearchKey = {
  keyWord: "",
  startDate: "all",
  viewStatus: "all",
  sortOrder: "desc",
};

const provideValue = ref({ ...defaultSearchKey });
const cPage = ref(1); // 현재 페이지
provide("provideValue", provideValue);
provide("cPage", cPage);
provide("defaultSearchKey", defaultSearchKey);
</script>




<!-- // 검색 조건 초기화 함수
const resetSearchKey = () => {
  Object.assign(searchKey, defaultSearchKey); // 상태 초기화
}; -->