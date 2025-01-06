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
          <th>이름<span style="color: red">*</span></th>
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
          <th>생년월일<span style="color: red">*</span></th>
          <td><input type="date" v-model="userDetailValue.birthday" /></td>
        </tr>
        <tr>
          <th>전화번호<span style="color: red">*</span></th>
          <td><input type="text" v-model="userDetailValue.phone" /></td>
        </tr>
        <tr>
          <th>이메일<span style="color: red">*</span></th>
          <td><input type="email" v-model="userDetailValue.email" /></td>
        </tr>
        <tr v-if="userDetailValue.userType == 'B'">
          <th>기업정보</th>
          <td>
            <button @click="handlerUpdateBiz()">{{ chkRegBiz.bizIdx ? "수정" : "등록" }}</button>
          </td>
        </tr>
        <tr>
          <th>우편변호<span style="color: red">*</span></th>
          <td><input type="text" v-model="userDetailValue.zipCode" readonly /></td>
          <td><button @click="openDaumPostcode">우편번호 찾기</button></td>
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
</template>

<script setup>
import { toRaw } from "vue";
import { useRouter } from "vue-router";
import { useModalStore } from "../../../stores/modalState";
import { useUserInfo } from "../../../stores/userInfo";
import { useMypageDetailQuery } from "../../hook/mypage/useMypageDetailQuery";
import { useMypageDetailUpdateMutation } from "../../hook/mypage/useMypageDetailUpdateMutation";

const props = defineProps(["loginId"]);
const router = useRouter();
const userInfo = useUserInfo();
const userDetailValue = ref({});
const chkRegBiz = ref({});
const modalStatePw = useModalStore();

const {
  data: userDetail,
  isLoading,
  isSuccess,
  isError,
  refetch
} = useMypageDetailQuery(userInfo);

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

const { mutate: handlerUpdateBtn } = useMypageDetailUpdateMutation(userDetailValue, chkRegBiz);

const handlerPwModal = () => {
  modalStatePw.setModalState();
};

watchEffect(() => {
  if (isSuccess.value) {
    userDetailValue.value = toRaw(userDetail.value.detail);
    chkRegBiz.value = toRaw(userDetail.value.chkRegBiz);
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
  width: 250px;
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
