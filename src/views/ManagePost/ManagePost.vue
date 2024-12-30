<template>
    <ContextBox>공고보기</ContextBox>
    <BizPostMain></BizPostMain>
</template>

<script setup>
const bizSearchValue = ref();

provide("bizSearchValue", bizSearchValue);
</script>