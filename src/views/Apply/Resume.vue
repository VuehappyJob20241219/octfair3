<template>
  <ContextBox>나의 이력서</ContextBox>
  <ResumeList></ResumeList>
</template>

<script setup>
const provideValue = ref();

provide("provideValue", provideValue);
</script>
