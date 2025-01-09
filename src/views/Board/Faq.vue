<template>
    <ContextBox>FAQ</ContextBox>
    <FaqSearch></FaqSearch>
    <FaqMain></FaqMain>    
  </template>
  
 <script setup>
import { provide } from 'vue';

const provideValue = ref({});
provide("provideValue", provideValue);
</script>