<template>
  <div class="search-box">
    <input v-model.lazy="searchKey.searchTitle" />
    <input type="date" v-model="searchKey.searchStDate" />
    <input type="date" v-model="searchKey.searchEdDate" />
    <button @click="handlerSearch">검색</button>
  </div>
</template>
<script setup>
import { ref } from "vue";

const injectValue = inject('bizSearchValue');
const searchKey = ref({});

const handlerSearch = () => {
  if (new Date(searchKey.value.searchEdDate) < new Date(searchKey.value.searchStDate)) {
  alert("종료일자는 시작일자보다 나중이어야 합니다.");
  return;
  }
    injectValue.value = { ...searchKey.value };
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
