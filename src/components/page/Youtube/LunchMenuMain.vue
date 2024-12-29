<template>
  <div id="app">
    <h1>OCR 결과</h1>
    <input type="file" @change="handleFileUpload" />
    <p v-if="ocrText">{{ ocrText }}</p>
    <p v-else>파일을 선택하고 OCR 결과를 확인하세요.</p>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    const ocrText = ref('');
    const file = ref(null);

    // 파일 업로드 핸들러
    const handleFileUpload = async (event) => {
      if (event) {
        file.value = event.target.files[0];
      }

      if (file.value) {
        const formData = new FormData();
        formData.append('file', file.value);

        try {
          const response = await axios.post('http://localhost:3000/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          ocrText.value = response.data.text;
        } catch (error) {
          console.error('Error during OCR process:', error);
          ocrText.value = 'OCR 처리 중 오류 발생';
        }
      }
    };

    return {
      ocrText,
      handleFileUpload,
    };
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}
input[type="file"] {
  margin: 20px 0;
}
</style>
