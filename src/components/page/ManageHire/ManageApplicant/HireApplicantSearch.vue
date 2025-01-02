<template>
  <div class="search-box">
    <select v-model="selectedPostIdx" @change="handlerProcSearch(selectedPostIdx)">
      <option v-for="post in postList" v-bind:key="post.postIdx" v-bind:value="post.postIdx">
        {{ post.title }}
      </option>
    </select>
    <select v-model="selectedProc">
      <option v-for="process in procArry" v-bind:key="process" v-bind:value="process">
        {{ process }}
      </option>
      <option value="최종합격">최종합격</option>
      <option value="불합격">불합격</option>
    </select>
  </div>
</template>

<script setup>
import axios from "axios";
import { inject, onMounted } from "vue";
import { useUserInfo } from "../../../../stores/userInfo";

let procArry = ref();
const injectValue = inject("providedValue");
const postList = ref();
const selectedPostIdx = ref();
const selectedProc = ref();
const userInfo = useUserInfo();

const handlerInitSearch = () => {
  const param = { loginId: userInfo.user.loginId };
  axios.post("/api/manage-hire/applicantJson.do", param).then((res) => {
    postList.value = res.data.MDetail;
    procArry.value = res.data.MDetail[0].hirProcess.split(" - ");
    if (postList.value && postList.value.length > 0) {
      selectedPostIdx.value = postList.value[0].postIdx;
      selectedProc.value = procArry.value[0];
    }
    injectValue.value = {
      postIdx: selectedPostIdx,
      keyword: selectedProc,
      procArry: procArry,
    };
    console.log("search에서 념겨주는 injectValue.postIdx => " + injectValue.value.postIdx);
    console.log("search에서 념겨주는 injectValue.keyword => " + injectValue.value.keyword);
    console.log("search에서 념겨주는 injectValue.procArry => " + injectValue.value.procArry);
  });
};

const handlerProcSearch = (idx) => {
  const params = { loginId: userInfo.user.loginId, postIdx: idx };
  // console.log("선택된 postIdx --> " + params.postIdx);
  axios.post("/api/manage-hire/procList.do", params).then((res) => {
    procArry.value = res.data.procList.split(" - ");
    // console.log("바뀐 procArry ---> " + procArry.value);
    if (procArry.value) {
      selectedProc.value = procArry.value[0].process;
      selectedProc.value = procArry.value[0];
    }
  });
};

watch([selectedPostIdx, selectedProc], () => {
  injectValue.value = {
    postIdx: selectedPostIdx,
    keyword: selectedProc,
    procArry: procArry,
  };
  // console.log("바뀐 provide 공고번호 ==> " + injectValue.value.postIdx);
  // console.log("바뀐 provide 채용절차 ==> " + injectValue.value.keyword);
});

onMounted(() => handlerInitSearch());
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
