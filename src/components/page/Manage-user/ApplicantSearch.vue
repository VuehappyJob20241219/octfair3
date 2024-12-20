<template>
    <div class="search-box">
        회원명
        <input v-model.lazy="keyword" />
        <button @click="handlerSearch">검색</button>
    </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import router from "../../../router"

const keyword = ref("");

const handlerSearch = () => {
    const query = [];
    !keyword.value || query.push(`searchName=${keyword.value}`);

    const queryString = query.length > 0 ? `?${query.join(`&`)}` : ``;

    router.push(queryString);
};

</script>

<style lang="scss" scoped>
.search-box {
    margin-bottom: 10px;
    display: block;
    float: inline-end;
}

input {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border: none;
    color: white;
    width: 70px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 12px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    background-color: #3bb2ea;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}
</style>