<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <label class="title">개인 회원 정보</label>

                <div class="content">
                    <!-- <button @click="pwReset">초기화</button> -->
                </div>

                <button @click="handlerUpdateBtn">수정</button>
                <button @click="handlerPwModal">취소</button>
            </div>
        </div>
    </teleport>
</template>


<script setup>
// import axios from "axios";
import { useModalStore } from "../../../stores/modalState";

const emit = defineEmits(["postSuccess", "modalClose"]);

const modalStatePw = useModalStore();


const handlerUpdateBtn = () => {
    //update 만들어야함


    handlerPwModal();
}

const handlerPwModal = () => {
    modalStatePw.setModalState();
};

onUnmounted(() => {
    emit("modalClose");
});

</script>


<style lang="scss" scoped>
.backdrop {
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: row wrep;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    font-weight: bold;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 400px;
}


table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 18px;
    text-align: left;

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #2676bf;
        color: #ddd;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        cursor: pointer;
    }
}

.button-box {
    text-align: middle;
    margin-top: 0px;
}

button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 5px 5px;
    text-align: right;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 1px 1px;
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
</style>