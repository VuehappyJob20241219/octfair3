<template>
  <ul class="dashboard-ul">
    <li class="menu-bar">
      <LeftManuBar></LeftManuBar>
    </li>
    <li class="content">
      <keep-alive
        ><router-view><video-youtube></video-youtube></router-view
      ></keep-alive>
    </li>
  </ul>
</template>

<script setup>
import LeftManuBar from "../../components/layout/LeftManuBar.vue";
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
