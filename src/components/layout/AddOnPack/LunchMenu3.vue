<template>
  <div>
    <h1>더이츠푸드 메뉴 캘린더</h1>
    <vue-cal :events="events" :time="false" default-view="month" class="vuecal-theme-light" @cell-click="showDetails" />

    <!-- 선택한 메뉴 세부 정보 표시 -->
    <div v-if="selectedEvent" class="event-details">
      <h2></h2>
      <p v-for="(item, index) in selectedEvent.menuList" :key="index">{{ item }}</p>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css"; // Vue Cal 스타일 가져오기

export default {
  components: { VueCal },
  data() {
    return {
      rawData: `
        더이츠푸드1111
        12월30일 (월) 점심
        흰쌀밥/검은쌀잡곡밥
        김치콩나물국
        불맛제육볶음
        수제순살닭강정
        해물쟁반짜장면
        옥수수전
        볼어묵야채볶음
        치커리겉절이
        배추김치 겉절이
        양배추샐러드/떡
      `,
      events: [], // 캘린더에 표시할 이벤트 목록
      selectedEvent: null, // 선택한 이벤트 세부 정보
    };
  },
  // txt 파일에 text들 불러옴
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
        this.processData(data); // 파일 내용을 저장
      })
      .catch((error) => {
        console.error(error);
      });
  },
  // d
  methods: {
    showDetails(event) {
      console.log("여기 내려왔나?", event[0]);
      this.selectedEvent = event[0];
    },
    processData() {
      const lines = this.rawData.trim().split("\n"); // 데이터 줄 단위로 나누기
      const title = lines[0]; // 첫 줄은 제목
      const dateInfo = lines[1]; // 두 번째 줄은 날짜 정보
      const menuItems = lines.slice(2); // 나머지 줄은 메뉴

      // 날짜 파싱
      const dateMatch = dateInfo.match(/(\d+)월(\d+)일/);
      if (dateMatch) {
        const month = dateMatch[1].padStart(2, "0"); // 월
        const day = dateMatch[2].padStart(2, "0"); // 일
        const year = new Date().getFullYear(); // 현재 연도
        const isoDate = `${year}-${month}-${day}`; // ISO 날짜 형식

        // 이벤트 데이터 추가
        this.events.push({
          title: `${title} (${dateInfo})`,
          menuList: menuItems, // 메뉴를 배열로 저장
          description: menuItems.join(", "), // Vue Cal 툴팁에서 사용
          start: isoDate,
          end: isoDate,
        });
        console.log(this.events.menuList);

        this.showDetails(this.events);
      }
      console.log(this.events);
    },
  },
};
</script>

<style>
.vuecal-theme-light {
  max-width: 800px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

.event-details {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
}
</style>
