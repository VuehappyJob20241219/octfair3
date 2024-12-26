<template>
    <div class="divManageApplicantJoin">
        <div class="content">
            <table>
                <colgroup>
                    <col width="120px">
                    <col width="*">
                    <col width="120px">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>아이디</th>
                        <td><input v-model.lazy="register.loginId" type="text" /></td>
                        <td><button @click="loginIdCheck">중복확인</button></td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td><input v-model="register.password" type="text" /></td>
                    </tr>
                    <tr>
                        <th>비밀번호 확인</th>
                        <td><input v-model="register.password1" type="text" /></td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td><input v-model="register.name" type="text" /></td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td><select v-model="register.sex">
                                <option disabled value="">선택</option>
                                <option value="1">남자</option>
                                <option value="2">여자</option>
                            </select></td>
                    </tr>
                    <tr>
                        <th>생년월일</th>
                        <td><input v-model="register.birthday" type="date" /></td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td><input v-model="register.phone" type="tel" /></td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td><input v-model="register.email" type="email" /></td>
                    </tr>
                    <tr>
                        <th>우편번호</th>
                        <td><input v-model="register.zipCode" type="text" readonly /></td>
                        <td><button @click="openDaumPostcode">우편번호 찾기</button></td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td><input v-model="register.address" type="text" /></td>
                    </tr>
                    <tr>
                        <th>상세주소</th>
                        <td><input id:detailAddress type="text" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="handlerSaveBtn">회원가입</button>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRoute } from "vue-router";

const route = useRoute();
const register = ref({
    sex: ""
});
const checkId = ref(false);


const openDaumPostcode = () => { //카카오API사용
    new daum.Postcode({
        oncomplete: (data) => {
            register.value.zipCode = data.zonecode;
            register.value.address = data.roadAddress;
        },
    }).open();
}

const handlerSaveBtn = () => {

    if (!checkForm()) {
        console.log("등록에 실패하였습니다.");
        return;

    }
    if (!checkId.value) {
        alert("ID 중복 확인을 해주세요.");
        return false;
    }

    const param = new URLSearchParams({
        ...register.value,
        action: 'I',//필요없지만 BE와 맞추려고 사용
        ckIdcheckreg: '1',//필요없지만 BE와 맞추려고 사용
        ckEmailcheckreg: '0',//필요없지만 BE와 맞추려고 사용
        userType: 'A',
        statusYn: 1
    });

    console.log(register.value)
    axios.post("/api/register.do", param).then((res) => {
        if (res.data.result === 'success') {
            alert("회원 가입에 성공했습니다.")
            route.push({
                name: "login"
            })
        }
    })

}

const checkForm = () => {
    let inputId = register.value.loginId;
    let inputPwd = register.value.password;
    let inputPwdOk = register.value.password1;

    let inputName = register.value.name;
    let inputSex = register.value.sex;
    let inputBirthday = register.value.birthday;
    let inputPhone = register.value.phone;
    let inputEmail = register.value.email;
    let inputZipCode = register.value.zipCode;

    const passwordRules = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    const emailRules = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const phoneRules = /^\d{2,3}-\d{3,4}-\d{4}$/;

    if (!inputId) {
        alert("아이디를 입력해주세요.");
        return false;
    }

    if (!passwordRules.test(inputPwd)) {
        alert("비밀 번호는 숫자,영문자,특수문자 조합으로 8~15자리를 사용해야 합니다.");
        return false;
    }
    if (!inputPwdOk) {
        alert("비밀번호 확인란을 입력해주세요.");
        return false;
    }

    if (!(inputPwd === inputPwdOk)) {
        alert("비밀번호와 확인용 비밀번호가 일치하지 않습니다.");
        return false;
    }

    if (!inputName || inputName < 1) {
        alert("이름을 입력하세요.");
        return false;
    }
    if (!inputSex) {
        alert("성별을 선택해주세요.");
        return false;
    }
    if (!inputBirthday) {
        alert("생일을 입력해주세요.");
        return false;
    }
    if (!inputPhone) {
        alert("전화번호를 입력해주세요.");
        return false;
    }
    if (!phoneRules.test(inputPhone)) {
        alert("전화번호 형식을 확인해주세요.");
        return false;
    }
    if (!inputPhone) {
        alert("이메일을 입력해주세요.");
        return false;
    }
    if (!emailRules.test(inputEmail)) {
        alert("이메일 형식을 확인해주세요.");
        return false;
    }
    if (!inputZipCode) {
        alert("우편번호(주소)를 입력해주세요.");
        return false;
    }

    return true;
}

const loginIdCheck = () => {
    let inputId = register.value.loginId;

    const param = new URLSearchParams({
        loginId: inputId
    });

    axios.post("/api/check_loginId.do", param).then((res) => {

        if (res.data === 0) {
            checkId.value = true;
            alert("사용할 수 있는 아이디 입니다.");
        } else {
            alert("중복된 아이디가 존재합니다.");
        }
    }).catch(() => { });
}

watch(() => register.value.loginId, () => {
    checkId.value = false;
    console.log(checkId.value);
})

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
    z-index: 999;
    font-weight: bold;
}

label {
    display: flex;
    flex-direction: column;
}

label.title {
    font-size: 18px;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    max-width: 60%;
}

input[type="text"],
input[type="date"],
input[type="email"],
input[type="tel"] {
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