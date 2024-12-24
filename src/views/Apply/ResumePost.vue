<template>
  <ContextBox>이력서 수정/작성</ContextBox>
  <ResumeDetail></ResumeDetail>
</template>

<script setup>
const provideValue = ref();

provide("provideValue", provideValue);
</script>
