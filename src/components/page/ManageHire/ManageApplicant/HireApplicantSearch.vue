<template>
  <div class="search-box">
    <select>
      <option v-for="post in postList" v-bind:key="post.postIdx">
        {{ post.title }}
      </option>
    </select>
    <select>
      <option v-for="process in procArry" v-bind:key="process">{{ process }}</option>
      <option>최종합격</option>
      <option>불합격</option>
    </select>
  </div>
</template>

<script setup>
import { useUserInfo } from "../../../../stores/userInfo";
import { onMounted, reactive, watchEffect } from "vue";
import router from "../../../../router";
import axios from "axios";

const postList = ref();
const userInfo = useUserInfo();
const postIdx = ref(0);
let procArry = reactive([]);

const handlerPostSearch = () => {
  const param = { loginId: userInfo.user.loginId };
  axios.post("/api/manage-hire/applicantJson.do", param).then((res) => {
    postList.value = res.data.MDetail;
    console.log("절차 ==> " + res.data.MDetail[0].hirProcess);
    procArry = res.data.MDetail[0].hirProcess.split(" - ");
    console.log("firstSplit ==> " + procArry[0]);
  });
};

// const handlerProcSearch = (idx) => {
//   axios.post("/api/manage-hire/applicantJson.do", { postIdx: idx }).then((res) => {
//     procList.value = res.data.MDetail;
//     for (let i = 0; i < res.data.MDetail.length; i++) {
//       procArray[i] = res.data.MDetail[i].hirProcess;
//     }
//     console.log(procArray);
//   });
// };

const handlerSearch = () => {
  const query = [];
  !postIdx.value || query.push(`postIdx=${postIdx.value}`);
  !procIdx.value || query.push(`procIdx=${procIdx.value}`);

  const queryString = query.length > 0 ? `?${query.join("&")}` : "";
  router.push(queryString);
};

watchEffect(() => window.location.search && router.push(window.location.pathname, { replace: true }));

onMounted(() => handlerPostSearch());
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
