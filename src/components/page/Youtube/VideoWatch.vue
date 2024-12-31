<template>
    <iframe
        :src="videoUrl.url"
        allow="autoplay; encrypted-media" 
        allowfullscreen
    />
    <button @click="$router.go(-1)">뒤로가기</button>
</template>

<script setup>
const videoUrl = inject("provideUrl");

</script>

<style scoped>
iframe{
    margin: 10px;
    width: 850px;
    height: 480px;
}
</style>