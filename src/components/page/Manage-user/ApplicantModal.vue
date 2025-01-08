<template>
  <teleport to="body">
    <div class="backdrop">
      <div v-if="isLoading">로딩중 입니다</div>
      <div v-if="isSuccess" class="container">
        <label class="title">개인 회원 정보</label>
        <div class="content">
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
                <td><input type="text" v-model="applicantDetailValue.loginId" readonly /></td>
              </tr>
              <tr>
                <th>비밀번호</th>
                <td><button @click="resetPwBtn">초기화</button></td>
              </tr>
              <tr>
                <th>이름<span style="color: red">*</span></th>
                <td><input type="text" v-model="applicantDetailValue.name" /></td>
              </tr>
              <tr>
                <th>성별</th>
                <td>
                  <select v-model="applicantDetailValue.sex">
                    <option value="1">남자</option>
                    <option value="2">여자</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>생년월일<span style="color: red">*</span></th>
                <td><input type="date" v-model="applicantDetailValue.birthday" :max="today" /></td>
              </tr>
              <tr>
                <th>전화번호<span style="color: red">*</span></th>
                <td><input type="text" v-model="applicantDetailValue.phone"
                    placeholder="예시: 02-123-4567, 010-1234-5678" /></td>
              </tr>
              <tr>
                <th>이메일<span style="color: red">*</span></th>
                <td><input type="email" v-model="applicantDetailValue.email" placeholder="예시: abc@naver.com" /></td>
              </tr>
              <tr>
                <th>가입일자<span style="color: red">*</span></th>
                <td><input type="date" v-model="applicantDetailValue.regdate" :max="today" /></td>
              </tr>
              <tr>
                <th>활성화</th>
                <td>
                  <select v-model="applicantDetailValue.statusYn">
                    <option value="1">활성</option>
                    <option value="2">비활성</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>우편변호<span style="color: red">*</span></th>
                <td><input type="text" v-model="applicantDetailValue.zipCode" readonly /></td>
                <td><button @click="openDaumPostcode">우편번호 찾기</button></td>
              </tr>
              <tr>
                <th>주소</th>
                <td><input type="text" v-model="applicantDetailValue.address" readonly /></td>
              </tr>
              <tr>
                <th>상세주소</th>
                <td><input type="text" v-model="applicantDetailValue.detailAddress" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <button @click="handlerUpdateBtn">수정</button>
        <button @click="handlerModal">취소</button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { watchEffect } from "vue";
import { useModalStore } from "../../../stores/modalState";
import { useApplicantDetailQuery } from "../../hook/applicant/useApplicantDetailQuery";
import { useApplicantDetailUpdateMutation } from "../../hook/applicant/useApplicantDetailUpdateMutation";
import { useApplicantResetPwMutation } from "../../hook/applicant/useApplicantResetPwMutation";

const props = defineProps(["loginId"]);
const emit = defineEmits(["postSuccess"]);

const applicantDetailValue = ref({});
const modalStateApplicant = useModalStore();

const today = computed(() => {
  let now_utc = new Date();
  let timeOff = new Date().getTimezoneOffset() * 60000;
  return new Date(now_utc - timeOff).toISOString().split("T")[0];
})

const {
  data: applicantDetail,
  isLoading,
  isSuccess,
  isError,
} = useApplicantDetailQuery(props);

const openDaumPostcode = () => {
  //카카오API사용
  new daum.Postcode({
    oncomplete: (data) => {
      applicantDetailValue.value.zipCode = data.zonecode;
      applicantDetailValue.value.address = data.roadAddress;
    },
  }).open();
};

const { mutate: handlerUpdateBtn }
  = useApplicantDetailUpdateMutation(applicantDetailValue, emit);

const { mutate: resetPwBtn } = useApplicantResetPwMutation(applicantDetailValue);

const handlerModal = () => {
  modalStateApplicant.setModalState();
};

watchEffect(() => {
  if (isSuccess.value) {
    applicantDetailValue.value = toRaw(applicantDetail.value.detail);
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
  overflow: hidden;
  /* 모달 영역을 벗어나는 내용 숨김 */
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
  // max-width: 60%;
  width: 550px;
  max-height: 90%;
  /* 모달 높이를 화면에 맞게 제한 */
  overflow-y: auto;
  /* 내부 스크롤 가능하게 설정 */
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
