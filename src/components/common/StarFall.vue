<template>
  <div class="starfall-container">
    <div 
      v-for="(star, index) in stars" 
      :key="index" 
      class="star" 
      :style="getStarStyle(star)"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 별똥별 데이터 배열
const stars = ref([]);

// 파스텔 색상 배열
const pastelColors = [
    '#FFB6C1',  // 연분홍색
    '#87CEFA',  // 하늘색
    '#FFFACD',  // 레몬색
    '#D8BFD8',  // 라벤더색
    '#FAD02E',  // 노란색
    '#B0E57C',  // 연두색
];

// 별똥별 생성 함수
const createStar = () => {
  return {
    left: `${Math.random() * 100}vw`,  // 랜덤한 x 위치
    size: `${Math.random() * 3 + 2}rem`,  // 별 크기 (2~5rem)
    color: pastelColors[Math.floor(Math.random() * pastelColors.length)], // 랜덤 색상
    animationDelay: `${Math.random() * 5}s`, // 애니메이션 딜레이 (별이 떨어지는 속도)
    animationDuration: `${Math.random() * 5 + 5}s`, // 애니메이션 지속 시간 (5~10초로 설정하여 더 천천히 떨어지게)
  };
};

// 별을 일정 시간마다 생성
onMounted(() => {
  setInterval(() => {
    if (stars.value.length < 60) { // 별의 갯수를 10개 이하로 제한
      stars.value.push(createStar()); // 새로운 별을 추가
    }
  }, 500); // 500ms마다 별을 추가하여 속도 줄임
});

// 별 스타일 함수
const getStarStyle = (star) => {
  return {
    left: star.left,
    top: '-10px',  // 화면 상단에서 시작
    width: star.size,
    height: star.size,
    backgroundColor: star.color,  // 랜덤 색상 적용
    borderRadius: '50%',
    animationDelay: star.animationDelay,
    animationDuration: star.animationDuration,
  };
};
</script>

<style scoped>
.starfall-container {
  position: fixed; /* 화면에 고정되도록 설정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* 다른 요소들 뒤에 배치 */
  pointer-events: none; /* 클릭 등의 상호작용을 방지 */
}

.star {
  position: absolute;
  top: -10px; /* 별이 화면 상단에서 시작하도록 설정 */
  animation: fall linear infinite;
}

@keyframes fall {
  0% {
    transform: translateY(0) scale(1);  /* 처음 위치 */
  }
  100% {
    transform: translateY(100vh) scale(0.5);  /* 떨어지면서 크기 줄어들기 */
  }
}
</style>
