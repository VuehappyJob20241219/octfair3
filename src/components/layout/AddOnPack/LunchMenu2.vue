<template>
  <div>
    <h1>오늘의 식단</h1>
    <div v-if="fileContent">
      <!-- <h2>파일 내용:</h2> -->
      <pre>{{ fileContent }}</pre>
    </div>
    <div v-else>파일을 불러오는 중...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileContent: "", // 파일 내용을 저장할 변수
    };
  },
  mounted() {
    // HTTP 요청으로 파일 불러오기
    fetch("uploads/ocr_result(24-12-30).txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("파일을 불러오지 못했습니다.");
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        const list = data.trim().split(/\s+/);
        console.log(list);
        this.fileContent = data; // 파일 내용을 저장
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>
pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  overflow: auto;
}
</style>
