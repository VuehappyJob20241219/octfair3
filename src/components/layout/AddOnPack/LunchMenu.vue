<template>
    <div :style="{ width: props.width + 'px' }">
      <img
        v-if="imageUrl === 'loading'"
        src="../../../assets/loading_circle.gif"
        alt="로딩 이미지"
        class="styled-image"
      />
      <img v-else-if="imageUrl === 'error'" src="../../../assets/noImage.jpg" alt="빈 이미지" class="styled-image" />
      <img v-else :src="imageUrl" alt="오늘의 메뉴" class="styled-image" />
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { onMounted, ref } from "vue";
  
  const props = defineProps(["url", "width"]);
  const imageUrl = ref("loading");
  
  onMounted(async () => {
    const baseURL = "/api";
    const apiURL = "/dashboard/menu.do";
    const menuURL = "https://pf.kakao.com/_QLvRn"; // 좌측은 이츠푸드, 우측은 벽산더이룸푸드: "https://pf.kakao.com/_xdLzxgG"
    const queryParam = `?menuURL=${menuURL}`;
  
    try {
      const response = await axios.get(`${baseURL}${apiURL}${queryParam}`);
      console.log("API Response:", response.data);
      imageUrl.value = `${baseURL}${response.data.imageUrl}`;
      fetchOCRResult(imageUrl.value); // 이미지 URL을 fetchOCRResult 함수로 전달
    } catch (error) {
      imageUrl.value = "error";
    }
  });
  
  async function fetchOCRResult(imageUrl) {
    try {
      const response = await fetch("http://localhost:3000/ocr", {
        method: "POST", // OCR 서버에 이미지를 보내기 위해 POST 요청 사용
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }), // 이미지 URL을 서버에 전달
      });
  
      const data = await response.json();
      if (data.result) {
        console.log("OCR 결과:", data.result);
      } else {
        console.error("OCR 실패:", data.error);
      }
    } catch (error) {
      console.error("요청 실패:", error);
    }
  }
  </script>
  
  <style scoped>
  .styled-image {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    border: 3px solid #d4af37;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    object-fit: cover;
  }
  </style>
  