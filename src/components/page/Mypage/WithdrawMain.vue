<template>
    <withdrawModal v-if="modalState.modalState" />
    <div class="content">
        <br>
        사용하고 계신 아이디를 탈퇴할 경우 재사용 및 복구가 불가능합니다.<br>
        탈퇴 후 회원정보 및 개인형 서비스 이용기록은 모두 삭제됩니다.<br>
        안내 사항을 모두 확인하였으며, 이에 동의합니다.<br>
    </div>
    <br>
    <button @click="handlerModal">동의하고 탈퇴합니다.</button>
</template>

<script setup>

import { useModalStore } from "../../../stores/modalState";

const modalState = useModalStore();

const handlerModal = () => {
    modalState.setModalState();
};

</script>


<style lang="scss" scoped>
label {
    display: flex;
    flex-direction: column;
}

label.title {
    font-size: 18px;
}

input[type="text"] {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    // font-size: 13px;
    width: 200px;
}

select {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.button-box {
    text-align: right;
    margin-top: 0px;
}

button {
    white-space: nowrap;
    /* 줄 바꿈 방지 */
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 22px;
    text-align: right;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    transition: 0.3s;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}

table {
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 14px;
    text-align: left;

    th {
        white-space: nowrap;
        /* 줄 바꿈 방지 */
        width: 100px;
        background-color: #2676bf;
        color: #ddd;
        display: block;
        height: 60px;
        line-height: 60px;
        padding-left: 10px;
    }

    td {
        // padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        width: 100px;
        height: 60px;
    }

    tbody {
        width: 500px;
    }
}
</style>