<template>
  <ContextBox>스크랩</ContextBox>
  <ScrapSearch/>
  <ScrapMain/>

</template>

<script setup>
import ScrapMain from '../../components/page/Scrap/ScrapMain.vue';
import ScrapSearch from '../../components/page/Scrap/ScrapSearch.vue';


const provideValue = ref();
provide("provideValue", provideValue);

</script>

