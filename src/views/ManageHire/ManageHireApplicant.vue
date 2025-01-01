<template>
  <ContextBox>지원자 관리</ContextBox>
  <HireApplicantSearch></HireApplicantSearch>
  <HireApplicantMain></HireApplicantMain>
</template>

<script setup>
const provideValue = ref();
provide("provideValue", provideValue);
</script>
