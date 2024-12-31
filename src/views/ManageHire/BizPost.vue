<template>
  <template v-if="userInfo.user.userType === 'M' && route.name == 'managePostApproval'">
    <ContextBox>공고심사</ContextBox>
    <BizPostSearch></BizPostSearch>
  </template>
  <template v-if="userInfo.user.userType === 'A' || route.name == 'managePost'">
    <ContextBox>공고보기</ContextBox>
    <BizPostSearch></BizPostSearch>
  </template>
  <template v-if="userInfo.user.userType === 'B'">
    <ContextBox>공고관리</ContextBox>
  </template>
  <BizPostMain></BizPostMain>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useUserInfo } from "../../stores/userInfo";

const route = useRoute();
const userInfo = useUserInfo();
const bizSearchValue = ref();

provide("bizSearchValue", bizSearchValue);
</script>
