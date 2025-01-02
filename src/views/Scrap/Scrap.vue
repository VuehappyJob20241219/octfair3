<template>
  <ContextBox>스크랩</ContextBox>
  <ScrapSearch/>
  <ScrapMain/>

</template>

<script setup>
import { provide } from 'vue';
import ScrapMain from '../../components/page/Scrap/ScrapMain.vue';
import ScrapSearch from '../../components/page/Scrap/ScrapSearch.vue';


const provideValue = ref();
const checkedList = ref([]); 
provide("provideValue", provideValue);
provide("checkedList", checkedList);

</script>

