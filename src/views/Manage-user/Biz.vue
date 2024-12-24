<template>
  <ContextBox>기업회원관리</ContextBox>
  <BizSearch></BizSearch>
  <BizMain></BizMain>
</template>

<script setup>
const provideValue = ref();
provide("provideValue", provideValue);
</script>