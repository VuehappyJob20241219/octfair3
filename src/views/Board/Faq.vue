<template>
  <ContextBox>FAQ</ContextBox>
  <FaqSearch></FaqSearch>
  <FaqMain></FaqMain>    
</template>
  
 <script setup>


 const provideValue = ref();
  
provide("provideValue", provideValue);
</script>