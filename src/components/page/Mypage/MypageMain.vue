<template>
    <MypageModal v-if="modalStatePw.modalState" />

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
                    <td><input type="text" v-model="bizDetail.loginId" readonly /></td>
                </tr>
                <tr>
                    <th>비밀번호</th>
                    <td><button @click="handlerPwModal">수정</button></td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td><input type="text" v-model="bizDetail.name" /></td>
                </tr>
                <tr>
                    <th>성별</th>
                    <td><select v-model="bizDetail.sex">
                            <option value="1">남자</option>
                            <option value="2">여자</option>
                        </select></td>
                </tr>
                <tr>
                    <th>생년월일</th>
                    <td><input type="date" v-model="bizDetail.birthday" /></td>
                </tr>
                <tr>
                    <th>전화번호</th>
                    <td><input type="text" v-model="bizDetail.phone" /></td>
                </tr>
                <tr>
                    <th>이메일</th>
                    <td><input type="email" v-model="bizDetail.email" /></td>
                </tr>
                <tr v-if="bizDetail.userType == B">
                    <th>기업정보</th>
                    <td><button>수정</button></td>
                </tr>
                <tr>
                    <th>우편변호</th>
                    <td><input type="text" v-model="bizDetail.zipCode" readonly /></td>
                    <button @click="openDaumPostcode">우편번호 찾기</button>
                </tr>
                <tr>
                    <th>주소</th>
                    <td><input type="text" v-model="bizDetail.address" /></td>
                </tr>
                <tr>
                    <th>상세주소</th>
                    <td><input type="text" v-model="bizDetail.detailAddress" /></td>
                </tr>
            </tbody>
        </table>
    </div>
    <button @click="handlerUpdateBtn">수정</button>
    <button>취소</button>
</template>

<script setup>
import axios from "axios";
import { useModalStore } from "../../../stores/modalState";
import { useUserInfo } from '../../../stores/userInfo';

const props = defineProps(["loginId"]);

const userInfo = useUserInfo();
const bizDetail = ref({});
const modalStatePw = useModalStore();

const searchDetail = () => {
    const param = new URLSearchParams({
        loginId: userInfo.user.loginId
    });

    axios.post('/api/mypage/userDetail.do', param)
        .then((res) => {
            bizDetail.value = res.data.detail;
        });
};

const openDaumPostcode = () => { //카카오API사용
    new daum.Postcode({
        oncomplete: (data) => {
            bizDetail.value.zipCode = data.zonecode;
            bizDetail.value.address = data.roadAddress;
        },
    }).open();
}

const handlerUpdateBtn = () => {
    //유효성 검사
    if (!checkForm()) {
        return;
    }

    const param = new URLSearchParams({
        ...bizDetail.value
    });

    axios.post("/api/mypage/updateUserInfo.do", param).then((res) => {
        if (res.data.result === 'success') {
            alert("정보를 수정하였습니다.")
        };
    })
}

const checkForm = () => {
    let inputName = bizDetail.value.name;
    let inputSex = bizDetail.value.sex;
    let inputBirthday = bizDetail.value.birthday;
    let inputPhone = bizDetail.value.phone;
    let inputEmail = bizDetail.value.email;
    let inputZipCode = bizDetail.value.zipCode;

    let emailRules = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    let phoneRules = /^\d{2,3}-\d{3,4}-\d{4}$/;
    let ZipCodeRules = /[0-9\-]{5}/;

    if (inputName.length < 1) {
        alert("이름을 입력하세요.");
        return false;
    }
    if (inputSex.length < 1) {
        alert("성별을 선택해주세요.");
        return false;
    }
    if (inputBirthday.length < 1) {
        alert("생일을 입력해주세요.");
        return false;
    }
    if (inputPhone.length < 1) {
        alert("전화번호를 선택해주세요.");
        return false;
    }
    if (!phoneRules.test(inputPhone)) {
        alert("전화번호 형식을 확인해주세요.");
        return false;
    }
    if (inputEmail.length < 1) {
        alert("이메일을 선택해주세요.");
        return false;
    }
    if (!emailRules.test(inputEmail)) {
        alert("이메일 형식을 확인해주세요.");
        return false;
    }
    if (inputZipCode.length < 1) {
        alert("우편번호(주소)를 입력해주세요.");
        return false;
    }
    if (!ZipCodeRules.test(inputZipCode)) {
        alert("우편번호를 확인해주세요.");
        return false;
    }
    return true;
}

const handlerPwModal = () => {
    modalStatePw.setModalState();
};

onMounted(() => {
    userInfo.user.loginId && searchDetail();
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