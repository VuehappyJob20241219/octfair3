<template>
  <div class="search-box">
    <span>공고제목</span>
    <select v-model.lazy="postIdx">
      <option v-for="post in postList" v-bind:key="post.postIdx">{{ post.title }}</option>
    </select>
    <!-- <select v-for="process in processList.process" :key="process.processIdx">
      <option>{{ process.processName }}</option>
    </select> -->
  </div>
</template>
<script setup>
import axios from "axios";
import { useUserInfo } from "../../../../stores/userInfo";
const postList = ref();
const userInfo = useUserInfo();
const keyword = ref("");

const handlerSearch = async () => {
  await axios.post("/api/manage-hire/applicantJson.do", { loginId: userInfo.user.loginId }).then((res) => {
    postList.value = res.data.MDetail;
  });
};

// watch(route, searchMenu);

onMounted(() => {
  handlerSearch();
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
