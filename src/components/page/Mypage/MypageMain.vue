<template>
  <MypageModal v-if="modalStatePw.modalState" />
  <div v-if="isLoading">로딩중 입니다</div>
  <div v-if="isSuccess" class="content">
    <table>
      <colgroup>
        <col width="120px" />
        <col width="*" />
        <col width="120px" />
        <col width="*" />
      </colgroup>
      <tbody>
        <tr>
          <th>아이디</th>
          <td><input type="text" v-model="userDetailValue.loginId" readonly /></td>
        </tr>
        <tr>
          <th>비밀번호</th>
          <td><button @click="handlerPwModal">수정</button></td>
        </tr>
        <tr>
          <th>이름</th>
          <td><input type="text" v-model="userDetailValue.name" /></td>
        </tr>
        <tr>
          <th>성별</th>
          <td>
            <select v-model="userDetailValue.sex">
              <option value="1">남자</option>
              <option value="2">여자</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>생년월일</th>
          <td><input type="date" v-model="userDetailValue.birthday" /></td>
        </tr>
        <tr>
          <th>전화번호</th>
          <td><input type="text" v-model="userDetailValue.phone" /></td>
        </tr>
        <tr>
          <th>이메일</th>
          <td><input type="email" v-model="userDetailValue.email" /></td>
        </tr>
        <tr v-if="userDetailValue.userType == 'B'">
          <th>기업정보</th>
          <td>
            <button @click="handlerUpdateBiz()">{{ chkRegBiz.bizIdx ? "수정" : "등록" }}</button>
          </td>
        </tr>
        <tr>
          <th>우편변호</th>
          <td><input type="text" v-model="userDetailValue.zipCode" readonly /></td>
          <button @click="openDaumPostcode">우편번호 찾기</button>
        </tr>
        <tr>
          <th>주소</th>
          <td><input type="text" v-model="userDetailValue.address" readonly /></td>
        </tr>
        <tr>
          <th>상세주소</th>
          <td><input type="text" v-model="userDetailValue.detailAddress" /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <button @click="handlerUpdateBtn">수정</button>
  <button>취소</button>
</template>

<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { useRouter } from "vue-router";
import { useModalStore } from "../../../stores/modalState";
import { useUserInfo } from "../../../stores/userInfo";

const props = defineProps(["loginId"]);

const router = useRouter();
const userInfo = useUserInfo();
// const userDetail = ref({});
const userDetailValue = ref({});
const chkRegBiz = ref({});
const modalStatePw = useModalStore();


const searchDetail = async () => {
  const param = new URLSearchParams({
    loginId: userInfo.user.loginId,
  });

  const result = await axios.post("/api/mypage/userDetail.do", param)

  return result.data;
}

const {
  data: userDetail,
  isLoading,
  isSuccess,
  isError,
  refetch
} = useQuery({
  queryKey: ["userDetail"],
  queryFn: searchDetail,
  enabled: !!userInfo.user.loginId
});

const openDaumPostcode = () => {
  //카카오API사용
  new daum.Postcode({
    oncomplete: (data) => {
      userDetailValue.value.zipCode = data.zonecode;
      userDetailValue.value.address = data.roadAddress;
    },
  }).open();
};

const handlerUpdateBiz = () => {
  router.push({
    path: "/vue/company/companyUpdatePage.do",
  });
};

const updateUserInfoDetail = async () => {
  if (!checkForm()) {
    return;
  }

  const param = new URLSearchParams({
    ...userDetailValue.value,
  });

  return await axios.post("/api/mypage/updateUserInfo.do", param);
}

const { mutate: handlerUpdateBtn } = useMutation({
  mutationFn: updateUserInfoDetail,
  mutationKey: ["userInfoUpdate"],
  onSettled: (data, error) => {
    console.log(data.data);
    if (data.data.result === "success") {
      alert("정보를 수정하였습니다.");
    }
  }
})

const checkForm = () => {
  let inputName = userDetailValue.value.name;
  let inputBirthday = userDetailValue.value.birthday;
  let inputPhone = userDetailValue.value.phone;
  let inputEmail = userDetailValue.value.email;
  let inputZipCode = userDetailValue.value.zipCode;

  const emailRules = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const phoneRules = /^\d{2,3}-\d{3,4}-\d{4}$/;
  const ZipCodeRules = /[0-9\-]{5}/;

  if (!inputName) {
    alert("이름을 입력하세요.");
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
  if (!inputEmail) {
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
  if (!ZipCodeRules.test(inputZipCode)) {
    alert("우편번호를 확인해주세요.");
    return false;
  }
  return true;
};

const handlerPwModal = () => {
  modalStatePw.setModalState();
};

watchEffect(() => {
  if (isSuccess.value) {
    userDetailValue.value = toRaw(userDetail.value.detail);
  }
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
