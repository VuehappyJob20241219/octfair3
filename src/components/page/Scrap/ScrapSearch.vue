<template>
    <div class="search-box">
        <input v-model="searchKey.searchTitle"/>
        <input type="date" v-model="searchKey.searchStDate" />
        <input type="date" v-model="searchKey.searchEdDate" />
        <button @click="handlerSearch">검색</button>
        <button @click="handlerDelete">삭제</button>
    </div>
</template>

<script setup>
import { inject } from 'vue';
import { useScrapDeleteMutation } from '../../hook/scrap/useScrapDeleteMutation';

const injectValue = inject("provideValue");
const searchKey = ref({});
const checkedList = inject("checkedList");

const handlerSearch = () => {
    injectValue.value = { ...searchKey.value };
}

const { mutate: handlerDelete } = useScrapDeleteMutation({ scrapIndexes: checkedList.value });


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
