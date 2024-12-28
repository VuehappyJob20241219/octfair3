<template>
    <VideoSearch></VideoSearch>
    <ContextBox>자료검색</ContextBox>
    <!-- 분기 처리 -->
    <VideoWatch></VideoWatch>
    <!-- <VideoYoutubeMain v-else></VideoYoutubeMain> -->
  </template>
  
  <script setup>
  import { provide, ref, reactive } from "vue";
  import VideoSearch from '../../components/page/Youtube/VideoSearch.vue';
  import VideoWatch from '../../components/page/Youtube/VideoWatch.vue';
  import VideoYoutubeMain from '../../components/page/Youtube/VideoYoutubeMain.vue';
  
  // 제공할 값
  const provideValue = reactive({ keyword: "" });
  const provideUrl = reactive({ url: "" });
  
  // Provide로 자식 컴포넌트에 값 전달
  provide("provideValue", provideValue);
  provide("provideUrl", provideUrl);
  </script>
  