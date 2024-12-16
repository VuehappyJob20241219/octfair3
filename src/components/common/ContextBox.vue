<template>
    <div class="context-box">
        <div class="context-slot">
            <!-- react의 children과 같은 역할 -->
            <slot></slot>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.context-box {
    background-color: #e0e0e0;
    padding: 10px 100% 10px 0px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    display: block;
}

.context-slot {
    width: max-content;
    font-size: 30px;
    margin-left: 10px;
    font-weight: bold;
    position: relative;
    z-index: 0px;
}
</style>
