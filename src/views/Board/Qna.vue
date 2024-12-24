<template>
  <QnaSearch />

  <ContextBox>QNA</ContextBox>

  <QnaMain />
</template>

<script setup>
import QnaMain from "../../components/page/Board/Qna/QnaMain.vue";
import QnaSearch from "../../components/page/Board/Qna/QnaSearch.vue";

const providedSearchValue = ref({});
const providedRequestType = reactive({ requestType: "" });

provide("providedSearchValue", providedSearchValue);

provide("providedRequestType", reactive({ requestType: "" }));
const injectedhRequestType = inject("providedRequestType");
console.log("확인용:", injectedhRequestType); // 출력: { requestType: "" }
</script>
