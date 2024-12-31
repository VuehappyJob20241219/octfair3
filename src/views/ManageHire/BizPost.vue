<template>
    <template v-if="userInfo.user.userType === 'M'">
        <ContextBox>공고심사</ContextBox>
    </template>
    <template v-if="userInfo.user.userType === 'A'">
        <ContextBox>공고보기</ContextBox>
    </template>
    <template v-if="userInfo.user.userType === 'B'">
        <ContextBox>공고관리</ContextBox>
    </template>    
    <BizPostMain></BizPostMain>
</template>

<script setup>
import { useUserInfo } from "../../stores/userInfo";

const userInfo = useUserInfo();
const bizSearchValue = ref();

provide("bizSearchValue", bizSearchValue);

</script>