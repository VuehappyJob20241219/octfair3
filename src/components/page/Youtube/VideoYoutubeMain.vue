<template>
  <div>
    <ul v-if="data && data.length" class="video-list">
      <li
        v-for="(video, index) in data"
        :key="index"
        @click="handlerPlay(video.videoId)"
        class="video-item"
      >
        <img :src="video.thumbnailUrl" alt="Thumbnail" />
        <p>{{ video.title }}</p>
      </li>
    </ul>
    <div v-else-if="loading">Loading...</div>
    <div v-else class="error">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watchEffect } from "vue";
import axios from "axios";

const data = ref([]); // 동영상 데이터 저장
const loading = ref(true); // 로딩 상태
const errorMessage = ref(""); // 에러 메시지
const keywordValue = inject("provideValue");
const videoUrl = inject("provideUrl");
const SeachKeyword = ref("");

const setActive = (newKeyword) => {
  console.log(newKeyword.keyword);
  fetchPopularVideos(newKeyword.keyword); // API 호출
};

const handlerPlay = (videoId) => {

  const url = `https://www.youtube.com/embed/${videoId}?start=12&autoplay=1&mute=0`;
  console.log(url)
  videoUrl.url =url
}


// API 요청 함수
const fetchPopularVideos = async (finalKeyword) => {
  console.log("여기탐?")
  const defaultKeyword = "개발자"; // 기본 검색어
  const keyword = finalKeyword || defaultKeyword; // 검색어가 없으면 기본값 사용
  try {
    const params = {
      key: "AIzaSyAJ4dc6-yESxTC58MB3qZPQ4fN-d03oscE", // 실제 API 키로 변경
      q: keyword,
      part: "snippet",
      type: "video",
      maxResults: 8,
      fields: "items(id/videoId, snippet(title, thumbnails/medium/url, channelTitle))",
    };

    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params,
    });

    // 검색된 동영상 데이터 가공
    data.value = response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
    }));
    //디비에 임시로 저장 (완성후 삭제)
    // const dataPara={
    //   data
    // }
    //const dbsave = await axios.get(디비url,dataPara)
    loading.value = false; // 로딩 완료
  } catch (error) {
    console.error("Error fetching videos:", error);
    errorMessage.value = "동영상을 불러오는 중 문제가 발생했습니다.";
    loading.value = false;
  }
};

// 동영상 페이지로 이동하는 함수
// const goToVideo = (videoId) => {
//   if (videoId) {
//     const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
//     window.open(videoUrl, "_blank"); // 새 탭에서 동영상 페이지로 이동
//   } else {
//     console.error("동영상 ID가 없습니다.");
//   }
// };

watch(
  keywordValue, // 감시 대상
  (newValue) => {
    SeachKeyword.value = newValue; // keyword 업데이트
    setActive(newValue); // 상태 변경 처리
  }
);
// 컴포넌트 마운트 시 API 호출
onMounted(() => {
  fetchPopularVideos();
});
</script>

<style scoped>
div{
  margin-top: 20px;
}
.video-list {
  list-style: none;
  padding: 0;
}
.video-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.video-item img {
  width: 120px;
  height: 90px;
}
.error {
  color: red;
  font-weight: bold;
}
</style>
