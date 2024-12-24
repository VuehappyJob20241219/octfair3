<template>
    <ContextBox>회원정보수정</ContextBox>
    <MypageMain></MypageMain>
</template>

<script setup>
const provideValue = ref();
provide("provideValue", provideValue);
</script>