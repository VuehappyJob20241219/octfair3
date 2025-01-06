<template>
    <div class="divManageJoin">
        <div class="content">
            <table>
                <colgroup>
                    <col width="130px">
                    <col width="*">
                    <col width="120px">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>회원유형<span style="color: red;">*</span></th>
                        <td><select v-model="register.userType">
                                <option disabled value="">선택</option>
                                <option value="A">개인회원</option>
                                <option value="B">기업회원</option>
                            </select></td>
                    </tr>
                    <tr>
                        <th>아이디<span style="color: red;">*</span></th>
                        <td><input v-model.lazy="register.loginId" type="text" /></td>
                        <td><button @click="loginIdCheckBtn">중복확인</button></td>
                    </tr>
                    <tr>
                        <th>비밀번호<span style="color: red;">*</span></th>
                        <td><input v-model="register.password" type="text" /></td>
                    </tr>
                    <tr>
                        <th>비밀번호 확인<span style="color: red;">*</span></th>
                        <td><input v-model="register.password1" type="text" /></td>
                    </tr>
                    <tr>
                        <th>이름<span style="color: red;">*</span></th>
                        <td><input v-model="register.name" type="text" /></td>
                    </tr>
                    <tr>
                        <th>성별<span style="color: red;">*</span></th>
                        <td><select v-model="register.sex">
                                <option disabled value="">선택</option>
                                <option value="1">남자</option>
                                <option value="2">여자</option>
                            </select></td>
                    </tr>
                    <tr>
                        <th>생년월일<span style="color: red;">*</span></th>
                        <td><input v-model="register.birthday" type="date" /></td>
                    </tr>
                    <tr>
                        <th>전화번호<span style="color: red;">*</span></th>
                        <td><input v-model="register.phone" type="tel" /></td>
                    </tr>
                    <tr>
                        <th>이메일<span style="color: red;">*</span></th>
                        <td><input v-model="register.email" type="email" /></td>
                    </tr>
                    <tr>
                        <th>우편번호<span style="color: red;">*</span></th>
                        <td><input v-model="register.zipCode" type="text" readonly /></td>
                        <td><button @click="openDaumPostcode">우편번호 찾기</button></td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td><input v-model="register.address" type="text" readonly /></td>
                    </tr>
                    <tr>
                        <th>상세주소</th>
                        <td><input id:detailAddress type="text" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="handlerSaveBtn">회원가입</button>
        <button @click="$router.go(-1)">취소</button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useJoinMutation } from '../../hook/join/useJoinMutation';
import { useLoginIdCheckMutation } from '../../hook/join/useLoginIdCheckMutation';

const register = ref({
    userType: "",
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

const { mutate: handlerSaveBtn } = useJoinMutation(checkId, register);

const { mutate: loginIdCheckBtn } = useLoginIdCheckMutation(checkId, register);


watch(() => register.value.loginId, () => {
    checkId.value = false;
    console.log(checkId.value);
})

</script>

<style lang="scss" scoped>
label {
    display: flex;
    flex-direction: column;
}

label.title {
    font-size: 18px;
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
        width: 120px;
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