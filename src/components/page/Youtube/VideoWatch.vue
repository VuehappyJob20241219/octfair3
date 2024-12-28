<template>
    <!-- :src="videoUrl.url+playUrl" -->
    <iframe
        allow="autoplay; encrypted-media" 
        allowfullscreen
    />
    <button @click="$router.go(-1)">뒤로가기</button>
</template>

<script setup>
const videoUrl = inject("provideUrl");
const playUrl = ref( "?start=12&autoplay=1&mute=0");

</script>

<style scoped>
iframe{
    margin: 10px;
    width: 850px;
    height: 480px;
}
</style>