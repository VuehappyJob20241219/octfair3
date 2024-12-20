<template>
  <ContextBox>개인회원관리</ContextBox>
  <ApplicantSearch></ApplicantSearch>
  <ApplicantMain></ApplicantMain>
</template>

<script setup>
const provideValue = ref();
provide("provideValue", provideValue);
</script>