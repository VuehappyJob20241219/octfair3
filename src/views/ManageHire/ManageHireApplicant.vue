<template>
  <ContextBox>지원자 관리</ContextBox>
  <HireApplicantSearch></HireApplicantSearch>
  <HireApplicantMain></HireApplicantMain>
</template>

<script setup>
const providedValue = ref({});
provide("providedValue", providedValue);
</script>
