<template>
    <ContextBox>공고관리</ContextBox>
    <BizPostMain></BizPostMain>
</template>

<script setup>
const bizSearchValue = ref();

provide("bizSearchValue", bizSearchValue);
</script>