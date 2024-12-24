<template>
  <QnaSearch />

  <ContextBox>QNA</ContextBox>

  <QnaMain />
</template>

<script setup>
import QnaMain from "../../components/page/Board/Qna/QnaMain.vue";
import QnaSearch from "../../components/page/Board/Qna/QnaSearch.vue";

const providedSearchValue = ref({});

provide("providedSearchValue", providedSearchValue);

provide("providedRequestType", reactive({ requestType: "" }));
</script>
