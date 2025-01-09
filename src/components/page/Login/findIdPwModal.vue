<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <ContextBox class="context-box">아이디/비밀번호 찾기</ContextBox>

                <div class="content">
                    <button @click="idBtn">아이디 찾기</button>
                    <button @click="pwBtn">비밀번호 찾기</button>

                    <!-- 아이디 찾기 -->
                    <div v-show="findId.state">
                        <table>
                            <colgroup>
                                <col width="200px">
                                <col width="*">
                                <col width="120px">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>이름을 입력하세요.</th>
                                    <td><input v-model="findId.inputName" type="text" /></td>
                                </tr>
                                <tr>
                                    <th>이메일을 입력하세요.</th>
                                    <td><input v-model="findId.inputEmail" type="text" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div><br>
                    <ContextBox class="context-box" v-show="myId.state">
                        찾으시는 ID는 "{{ myId.id }}" 입니다.
                    </ContextBox>

                    <!-- 비밀번호 찾기 1단계 -->
                    <div v-show="findInfoPw.state">
                        <table>
                            <colgroup>
                                <col width="200px">
                                <col width="*">
                                <col width="120px">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>아이디를 입력하세요.</th>
                                    <td><input v-model="findInfoPw.regiId" type="text" /></td>
                                </tr>
                                <tr>
                                    <th>이메일을 입력하세요.</th>
                                    <td><input v-model="findInfoPw.emailPwd" type="text" /></td>
                                </tr>
                            </tbody>
                        </table><br>
                    </div>

                    <!-- 비밀번호 찾기 2단계 -->
                    <div v-show="setPw.state">
                        <table>
                            <colgroup>
                                <col width="200px">
                                <col width="*">
                                <col width="120px">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>새 비밀번호</th>
                                    <td><input v-model="setPw.newPasswd" type="password" autocomplete="new-password" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>새 비밀번호 확인</th>
                                    <td><input v-model="setPw.newPasswdConfirm" type="password"
                                            autocomplete="new-password" /></td>
                                </tr>
                            </tbody>
                        </table><br>
                    </div>
                </div>
                <div class="checkbutton">
                    <button v-show="findId.state" @click="findIdBtn">확인</button>
                    <button v-show="findInfoPw.state" @click="findPwBtn">확인</button>
                    <button v-show="setPw.state" @click="handlerUpdateBtn">확인</button>
                    <button @click="handlerModal">취소</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { useModalStore } from "../../../stores/modalState";
import { useFindMyIdMutation } from "../../hook/login/useFindMyIdMutation";
import { useFindMyInfoPwMutation } from "../../hook/login/useFindMyInfoPwMutation";
import { useSetMyPwMutation } from "../../hook/login/useSetMyPwMutation";

const modalState = useModalStore();

const findId = ref({
    state: false,
    inputName: "",
    inputEmail: ""
});
const myId = ref({
    id: "",
    state: false
});

const findInfoPw = ref({
    state: false,
    regiId: "",
    emailPwd: ""
});
const setPw = ref({
    state: false,
    id: "",
    newPasswd: "",
    newPasswdConfirm: ""
});

const idBtn = () => {
    findId.value.state = !(findId.value.state);
    findId.value.inputName = "";
    findId.value.inputEmail = "";
    findInfoPw.value.state = false;
    myId.value.state = false;
    setPw.value.state = false;
}
const pwBtn = () => {
    findInfoPw.value.state = !(findInfoPw.value.state);
    findInfoPw.value.regiId = "";
    findInfoPw.value.emailPwd = "";
    findId.value.state = false;
    myId.value.state = false;
    setPw.value.state = false;
    setPw.value.Id = "";
    setPw.value.newPasswd = "";
    setPw.value.newPasswdConfirm = "";
}

const { mutate: findIdBtn } = useFindMyIdMutation(findId, myId);

const { mutate: findPwBtn } = useFindMyInfoPwMutation(findInfoPw, setPw);

const { mutate: handlerUpdateBtn } = useSetMyPwMutation(setPw);

const handlerModal = () => {
    modalState.setModalState();
};

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

.context-box {
    background-color: #E0E0E0;
    padding: 10px;
}

.content {
    padding-top: 20px;
    padding-bottom: 20px;
}

.content .context-box {
    background-color: #2676BF;
    color: white;
    margin-top: 20px;
}



input[type="text"],
input[type="password"] {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 200px;
}

label.title {
    font-size: 18px;
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