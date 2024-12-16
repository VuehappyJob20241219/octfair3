<template>
    <VueAwesomePaginate
        :totalItems="totalItems"
        :items-per-page="itemsPerPage"
        :max-pages-shown="maxPagesShown"
        :onClick="onClick"
    ></VueAwesomePaginate>
</template>

<script setup>
import { VueAwesomePaginate } from "vue-awesome-paginate";
const { totalItems, itemsPerPage, maxPagesShown, onClick } = defineProps([
    "totalItems",
    "itemsPerPage",
    "maxPagesShown",
    "onClick",
    "cPage"
]);
</script>

<style lang="scss">
.pagination-container {
    display: flex;
    column-gap: 10px;
    padding-left: 35%;
    padding-top: 10px;
    list-style-type: none;
}
.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}
.paginate-buttons:hover {
    background-color: #d8d8d8;
}
.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}
.active-page:hover {
    background-color: #2988c8;
}
</style>
