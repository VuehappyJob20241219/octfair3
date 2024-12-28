<template>
  <ul class="dashboard-ul">
    <li class="menu-bar">
      <LeftManuBar></LeftManuBar>
    </li>
    <li class="content">
      <keep-alive>
        <div v-if="isHomePage">
          <video-youtube />
        </div>
        <router-view> </router-view>
      </keep-alive>
    </li>
  </ul>
</template>

<script setup>
import { useRoute } from "vue-router";
import LeftManuBar from "../../components/layout/LeftManuBar.vue";
import { computed } from "vue";

// 현재 경로를 가져오기
const route = useRoute();

// '/vue' 경로일 때만 YouTube 비디오를 보이도록
const isHomePage = computed(() => route.path === "/vue");
</script>

<style scoped>
.dashboard-ul {
  list-style-type: none;
  display: flex;
  overflow: hidden;
}

.menu-bar {
  float: left;
}

.content {
  float: left;
  padding-left: 50px;
  padding-right: 10%;
  width: 77%;
  flex: 1;
}
</style>
