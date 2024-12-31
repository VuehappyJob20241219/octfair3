<template>
  <ContextBox>FAQ</ContextBox>
  <br>
  <FaqSearch></FaqSearch>
  <FaqMain></FaqMain>
</template>

<script setup>
const provideValue = ref();

provide("provideValue", provideValue);
</script>
