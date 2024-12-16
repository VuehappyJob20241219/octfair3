<template>
    <component :is="LoginMain"></component>
</template>

<script setup>
import LoginMain from '../../components/page/Login/LoginMain.vue';

const providedValue = ref();
provide('providedValue', providedValue);
</script>
