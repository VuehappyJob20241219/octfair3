<template>
  <div>
    <h3>유튜브 인기 급상승</h3>
    <ul v-if="data && data.length" class="video-list">
      <li v-for="(video, index) in data" :key="index" @click="goToVideo(video.id)" class="video-item">
        <img :src="video.snippet.thumbnails.medium.url" alt="Thumbnail" />
        <p>{{ video.snippet.title }}</p>
        <span>by {{ video.snippet.channelTitle }}</span>
      </li>
    </ul>
    <div v-else-if="loading">Loading...</div>
    <div v-else class="error">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const data = ref([]);
const loading = ref(true);
const errorMessage = ref("");

// API 요청 함수
const fetchPopularVideos = async () => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&regionCode=KR&key=AIzaSyAJ4dc6-yESxTC58MB3qZPQ4fN-d03oscE`
    );
    console.log("Popular videos:", response.data.items);
    data.value = response.data.items.map((item) => ({
      id: item.id,
      snippet: item.snippet,
    }));
  } catch (error) {
    console.error("API 요청 실패:", error);
    errorMessage.value = "데이터를 불러올 수 없습니다.";
  } finally {
    loading.value = false;
  }
};

// 동영상 페이지로 이동하는 함수
const goToVideo = (videoId) => {
  if (videoId) {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(videoUrl, "_blank"); // 새 탭에서 동영상 페이지로 이동
  } else {
    console.error("동영상 ID가 없습니다.");
  }
};

onMounted(() => {
  fetchPopularVideos();
});
</script>

<style scoped>
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
