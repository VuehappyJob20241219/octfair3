<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <label>개인 회원 정보</label>
                <div class="content">
                    <table>
                        <!-- <colgroup>
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                        </colgroup> -->
                        <colgroup>
                            <col width="120px">
                            <col width="*">
                            <col width="120px">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>아이디</th>
                                <td><input type="text" v-model="applicantDetail.loginId" readonly /></td>
                            </tr>
                            <tr>
                                <th>비밀번호</th>
                                <td><button>초기화</button></td>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td><input type="text" v-model="applicantDetail.name" /></td>
                            </tr>
                            <tr>
                                <th>성별</th>
                                <td><select v-model="applicantDetail.sex">
                                        <option value="1">남자</option>
                                        <option value="2">여자</option>
                                    </select></td>
                            </tr>
                            <tr>
                                <th>생년월일</th>
                                <td><input type="date" v-model="applicantDetail.birthday" /></td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td><input type="text" v-model="applicantDetail.phone" /></td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td><input type="text" v-model="applicantDetail.email" /></td>
                            </tr>
                            <tr>
                                <th>가입일자</th>
                                <td><input type="date" v-model="applicantDetail.regdate" /></td>
                            </tr>
                            <tr>
                                <th>활성화</th>
                                <td><select v-model="applicantDetail.statusYn">
                                        <option value="1">활성</option>
                                        <option value="2">비활성</option>
                                    </select></td>
                            </tr>
                            <tr>
                                <th>우편변호</th>
                                <td><input type="text" v-model="applicantDetail.zipCode" /></td>
                                <button @click="openDaumPostcode">우편번호 찾기</button>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td><input type="text" v-model="applicantDetail.address" /></td>
                            </tr>
                            <tr>
                                <th>상세주소</th>
                                <td><input type="text" v-model="applicantDetail.detailAddress" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button @click="handlerSaveBtn">수정</button>
                <button @click="handlerModal">취소</button>
            </div>
        </div>
    </teleport>
</template>


<script setup>
import axios from "axios";
import { useModalStore } from "../../../stores/modalState";

const emit = defineEmits(["postSuccess", "modalClose"]);
const props = defineProps(["loginId"]);

const applicantDetail = ref({});
const modalStateApplicant = useModalStore();

const searchDetail = () => {
    const param = new URLSearchParams({
        loginId: props.loginId
    });

    axios.post('/api/manage-user/applicantManageDetail.do', param)
        .then((res) => {
            applicantDetail.value = res.data.detail;
        });
};

const openDaumPostcode = () => { //카카오API사용
    new daum.Postcode({
        oncomplete: (data) => {
            applicantDetail.value.zipCode = data.zonecode;
            applicantDetail.value.address = data.roadAddress;
        },
    }).open();
}

const handlerSaveBtn = () => {
    //유효성 검사 필요
    const param = new URLSearchParams({
        ... applicantDetail.value
    });

    axios.post("/api/manage-user/applicantInfoUpdate.do",param).then((res) => {
        if(res.data.result === 'success'){
            handlerModal();
            emit('postSuccess');
        };
    })

}

const handlerModal = () => {
    modalStateApplicant.setModalState();
};

onMounted(() => {
    props.loginId && searchDetail();
});

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

label {
    display: flex;
    flex-direction: column;
}

input[type="text"] {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 200px;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 50%;
}

img {
    width: 100px;
    height: 100px;
}

.img-label {
    margin-top: 10px;
    padding: 6px 25px;
    background-color: #ccc;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.9);
    cursor: pointer;

    &:hover {
        background-color: #45a049;
        color: white;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
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

    // tr{
    //     vertical-align: middle; /* 세로 가운데 정렬 */
    // }

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

    // /* 테이블 올렸을 때 */
    // tbody tr:hover {
    //     background-color: #d3d3d3;
    //     opacity: 0.9;
    //     cursor: pointer;
    // }
}
</style>