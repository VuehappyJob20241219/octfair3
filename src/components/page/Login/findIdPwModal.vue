<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <label class="title">아이디/비밀번호 찾기</label>
                <div class="content">
                    <button @click="idBtn">아이디 찾기</button>
                    <button @click="pwBtn">비밀번호 찾기</button>

                    <div v-show="findId">
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
                                    <td><input id="regiName" type="text" /></td>
                                </tr>
                                <tr>
                                    <th>이메일을 입력하세요.</th>
                                    <td><input id="emailName" type="text" /></td>
                                </tr>
                            </tbody>
                        </table>
                        <button @click="findIdBtn">확인</button>
                    </div>
                    <context-box v-show="myId.state">
                        찾으시는 ID는 "{{ myId.id }}" 입니다.
                    </context-box>

                    <div v-show="findPw">
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
                                    <td><input id="regiId" type="text" /></td>
                                </tr>
                                <tr>
                                    <th>이메일을 입력하세요.</th>
                                    <td><input id="emailPwd" type="text" /></td>
                                </tr>
                            </tbody>
                        </table>
                        <button @click="findPwBtn">확인</button>
                    </div>

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
                                    <td><input id="newPasswd" type="text" /></td>
                                </tr>
                                <tr>
                                    <th>새 비밀번호 확인</th>
                                    <td><input id="newPasswdConfirm" type="text" /></td>
                                </tr>
                            </tbody>
                        </table>
                        <button @click="handlerUpdateBtn">확인</button>
                    </div>

                </div>
                <button @click="handlerModal">취소</button>
            </div>
        </div>
    </teleport>
</template>


<script setup>
import axios from "axios";
import { useModalStore } from "../../../stores/modalState";

const modalState = useModalStore();
const findId = ref(false);
const findPw = ref(false);

const myId = ref({
    id: "",
    state: false
});
const myPw = ref({
    pw: "",
    state: false
});

const setPw = ref({
    id: "",
    state: false
});

const idBtn = () => {
    findId.value = !(findId.value);
    findPw.value = false;

    // console.log("findId.value: " + findId.value);
}
const pwBtn = () => {
    findPw.value = !(findPw.value);
    findId.value = false;

    // console.log("findPw.value: " + findPw.value);
}

const findIdBtn = () => {
    let inputName = document.getElementById("regiName").value;
    let inputEmail = document.getElementById("emailName").value;

    if (!inputName) {
        alert("이름을 입력하세요.");
        return false;
    }

    if (!inputEmail) {
        alert("이메일을 입력하세요.");
        return false;
    }

    const param = new URLSearchParams({
        name: inputName,
        email: inputEmail
    })

    axios.post("/api/selectFindInfoId.do", param)
        .then((res) => {
            if (res.data.result === 'SUCCESS') {
                findId.value = false;
                myId.value.id = res.data.id;
                myId.value.state = true;
            };
        })
}

const findPwBtn = () => {
    let inputId = document.getElementById("regiId").value;
    let inputEmail = document.getElementById("emailPwd").value;

    if (!inputId) {
        alert("아이디을 입력하세요.");
        return false;
    }

    if (!inputEmail) {
        alert("이메일을 입력하세요.");
        return false;
    }

    const param = new URLSearchParams({
        id: document.getElementById("regiId").value,
        email: document.getElementById("emailPwd").value
    })

    axios.post("/api/selectFindInfoPw.do", param)
        .then((res) => {
            if (res.data.result === 'SUCCESS') {
                setPw.value.id = document.getElementById("regiId").value;
                findPw.value = false;
                setPw.value.state = true;
            };
        })
}


const handlerUpdateBtn = () => {
    let inputPw = document.getElementById("newPasswd").value;
    let inputPwOk = document.getElementById("newPasswdConfirm").value;

    const passwordRules = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;


    if (!inputPw) {
        alert("비밀번호를 입력하세요.");
        return false;
    }

    if (!passwordRules.test(inputPw)) {
        alert("비밀 번호는 숫자,영문자,특수문자 조합으로 8~15자리를 사용해야 합니다.");
        return false;
    }

    if (!inputPwOk) {
        alert("비밀번호 확인란을 입력하세요.");
        return false;
    }

    if (!(inputPw === inputPwOk)) {
        alert("새 비밀번호와 확인용 비밀번호가 일치하지 않습니다. 다시 입력해주세요.")
        return false;
    }


    const param = new URLSearchParams({
        id: setPw.value.id,
        pw: document.getElementById("newPasswd").value,
    });

    axios.post('/api/updateFindPw.do', param)
        .then((res) => {
            if (res.data.result === 'SUCCESS') {
                alert("비밀번호를 변경하였습니다.")
                handlerModal();
            } else {
                alert("비밀번호 변경에 실패하였습니다.")
            }
        })
}


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
    width: 400px;
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