<template>
  <ContextBox>공지사항</ContextBox>
  <NoticeSearch></NoticeSearch>
  <NoticeMain></NoticeMain>
</template>

<script setup>
const provideValue = ref();

provide("provideValue", provideValue);
</script>
