<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
@font-face {
  font-family: 'Nanum Barun Gothic';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('@/assets/fonts/NanumBarunGothic.ttf') format('truetype'); /* ttf 파일 경로 */
}
body {
  -ms-overflow-style: none;
  font-family: "Nanum Barun Gothic", sans-serif;
}
body::-webkit-scrollbar {
  display: none;
}
</style>
