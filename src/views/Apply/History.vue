<template>
  <ContextBox>입사지원 내역</ContextBox>
  <HistorySearch/>
  <HistoryMain/>
  
</template>

<script setup>
import HistoryMain from '../../components/page/Apply/History/HistoryMain.vue';
import HistorySearch from '../../components/page/Apply/History/HistorySearch.vue';

const provideValue = ref();

provide("provideValue", provideValue);
</script>
