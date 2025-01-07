<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <label class="title">비밀번호 수정</label>
                <div class="content">
                    <table>
                        <colgroup>
                            <col width="200px">
                            <col width="*">
                            <col width="120px">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>현재 비밀번호</th>
                                <td><input v-model="inputPw.passwd" type="text" /></td>
                            </tr>
                            <tr>
                                <th>새 비밀번호</th>
                                <td><input v-model="inputPw.newPasswd" type="text" /></td>
                            </tr>
                            <tr>
                                <th>새 비밀번호 확인</th>
                                <td><input v-model="inputPw.newPasswdConfirm" type="text" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <label class="tip">"비밀 번호는 숫자,영문자,특수문자 조합으로 8~15자리를 사용해야 합니다."</label>
                </div>
                <br />
                <button @click="handlerUpdateBtn">수정</button>
                <button @click="handlerPwModal">취소</button>
            </div>
        </div>
    </teleport>
</template>


<script setup>
import { useModalStore } from "../../../stores/modalState";
import { useUserInfo } from '../../../stores/userInfo';
import { useMypagePwUpdateMutation } from "../../hook/mypage/useMypagePwUpdateMutation";

const emit = defineEmits(["modalClose"]);

const userInfo = useUserInfo();
const modalStatePw = useModalStore();
const inputPw = ref({})

const { mutate: handlerUpdateBtn } = useMypagePwUpdateMutation(userInfo, inputPw);

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
    width: 500px;
}

label.title {
    font-size: 18px;
}

label.tip {
    font-size: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 14px;
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