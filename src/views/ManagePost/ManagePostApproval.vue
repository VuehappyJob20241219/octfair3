<template>
    <ContextBox>공고심사</ContextBox>
    <BizPostMain></BizPostMain>
</template>

<script setup>
const bizSearchValue = ref();

provide("bizSearchValue", bizSearchValue);
</script>