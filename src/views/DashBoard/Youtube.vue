<template>
  <VideoSearch></VideoSearch>
  <ContextBox>자료검색</ContextBox>
  <!-- 분기 처리 -->
  <VideoWatch v-if="provideUrl.url !== ''"></VideoWatch>
  <VideoYoutubeMain v-else-if="provideUrl.url === '' && stateValue.state === 'search'"></VideoYoutubeMain>
  <lunch-menu v-if="stateValue.state === 'Lunch'"></lunch-menu>
</template>

<script setup>
import { provide, reactive } from "vue";
import VideoSearch from "../../components/page/Youtube/VideoSearch.vue";
import VideoWatch from "../../components/page/Youtube/VideoWatch.vue";
import VideoYoutubeMain from "../../components/page/Youtube/VideoYoutubeMain.vue";

// Reactive 변수 선언
const provideValue = reactive({ keyword: "" });
const provideUrl = reactive({ url: "" });
const stateValue = reactive({ state: "Lunch" });

// Provide를 통해 값 전달
provide("stateValue", stateValue);
provide("provideValue", provideValue);
provide("provideUrl", provideUrl);
</script>

<style scoped>
/* 스타일은 비어 있는 상태 */
</style>
