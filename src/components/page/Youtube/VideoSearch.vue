<template>
  <div class="search-box">
    <button @click="btnHendler('search')">자료검색</button> 
    <button @click="btnHendler('Lunch')">오늘의 메뉴</button> 
    <input v-model.lazy="keyword" />
    <button @click="handlerSearch">검색</button>
  </div>
</template>
<script setup>

const keyword = ref("");
const keywordValue = inject("provideValue");
const stateValue = inject("stateValue");

const handlerSearch = () => {
  keywordValue.keyword=keyword.value;
};

const btnHendler = (e) => {
  console.log(e)
  stateValue.state = e;
}

</script>

<style lang="scss" scoped>
.search-box {
  margin-top: 5px;
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
  width: 80px;
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
