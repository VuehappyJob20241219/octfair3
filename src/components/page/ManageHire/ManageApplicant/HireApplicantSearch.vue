<template>
  <div class="search-box">
    <span>공고제목</span>
    <select v-for="post in postList.post" :key="post.postIdx">
      <option>{{ post.title }}</option>
    </select>
    <select v-for="process in processList.process" :key="process.processIdx">
      <option>{{ process.processName }}</option>
    </select>
  </div>
</template>
<script setup>
import axios from "axios";
const postList = ref();

const searchMenu = () => {
  axios.post("/api/manage-hire/applicant.do").then((res) => {
    // console.log("콘솔:" + res.data);
    postList.value = res.data;
    // processList.value = res.data;
  });
};

// watch(route, searchMenu);

onBeforeMount(() => {
  searchMenu();
});
</script>

<style lang="scss" scoped>
.search-box {
  margin-bottom: 10px;
  display: block;
  float: inline-end;
}

input,
select {
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
