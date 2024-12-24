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
                        <td><input v-model="register.registerId" type="text" /></td>
                        <td><button @click="loginIdCheck">중복확인</button></td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td><input v-model="register.registerPwd" type="text" /></td>
                    </tr>
                    <tr>
                        <th>비밀번호 확인</th>
                        <td><input v-model="register.registerPwdOk" type="text" /></td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td><input v-model="register.registerName" type="text" /></td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td><select v-model="register.registerSex">
                                <option value="1">남자</option>
                                <option value="2">여자</option>
                            </select></td>
                    </tr>
                    <tr>
                        <th>생년월일</th>
                        <td><input v-model="register.registerBirthday" type="date" /></td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td><input v-model="register.registerPhone" type="tel" /></td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td><input v-model="register.registerEmail" type="email" /></td>
                    </tr>
                    <tr>
                        <th>우편번호</th>
                        <td><input v-model="register.registerZipCode" type="text" readonly /></td>
                        <td><button @click="openDaumPostcode">우편번호 찾기</button></td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td><input v-model="register.registerAddress" type="text" /></td>
                    </tr>
                    <tr>
                        <th>상세주소</th>
                        <td><input id:registerDetailAddress type="text" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="handlerSaveBtn">회원가입</button>
    </div>
</template>

<script setup>
import axios from 'axios';


const register = ref({});
const checkId = ref(false);

const openDaumPostcode = () => { //카카오API사용
    new daum.Postcode({
        oncomplete: (data) => {
            register.value.registerZipCode = data.zonecode;
            register.value.registerAddress = data.roadAddress;
        },
    }).open();
}

const handlerSaveBtn = () => {

    if (!checkForm()) {
        console.log("등록에 실패하였습니다.");
        return;
    }

    console.log("테스트 등록 완료!!")

}

const checkForm = () => {
    let inputPwd = register.value.registerPwd;
    let inputPwdOk = register.value.registerPwdOk;

    let inputName = register.value.registerName;
    let inputSex = register.value.registerSex;
    let inputBirthday = register.value.registerBirthday;
    let inputPhone = register.value.registerPhone;
    let inputEmail = register.value.registerEmail;
    let inputZipCode = register.value.registerZipCode;

    const passwordRules = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    const emailRules = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const phoneRules = /^\d{2,3}-\d{3,4}-\d{4}$/;



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
    let inputId = register.value.registerId;

    const param = new URLSearchParams({
        loginId: inputId
    });

    axios.post("/api/check_loginId.do", param).then((res) => {

        if (res.data === 0) {
            alert("사용할 수 있는 아이디 입니다.");
        } else {
            alert("중복된 아이디가 존재합니다.");
        }
    }).catch(() => { });
}



</script>
