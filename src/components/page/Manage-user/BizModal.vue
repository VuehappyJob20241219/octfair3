<template>
  <teleport to="body">
    <div class="backdrop">
      <div v-if="isLoading">로딩중 입니다</div>
      <div v-if="isSuccess" class="container">
        <label class="title">회사 정보</label>
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
                <th>사업자번호</th>
                <td><input type="text" v-model="bizDetailValue.bizIdx" readonly /></td>
              </tr>
              <tr>
                <th>사업자명<span style="color: red">*</span></th>
                <td><input type="text" v-model="bizDetailValue.bizName" /></td>
              </tr>
              <tr>
                <th>대표자</th>
                <td><input type="text" v-model="bizDetailValue.bizCeoName" /></td>
              </tr>
              <tr>
                <th>사원수</th>
                <td><input type="text" v-model="bizDetailValue.bizEmpCount" /></td>
              </tr>
              <tr>
                <th>매출액</th>
                <td><input type="text" v-model="bizDetailValue.bizRevenue" /></td>
              </tr>
              <tr>
                <th>연락처</th>
                <td><input type="text" v-model="bizDetailValue.bizContact" /></td>
              </tr>
              <tr>
                <th>사업자주소</th>
                <td><input type="text" v-model="bizDetailValue.bizAddr" /></td>
              </tr>
              <tr>
                <th>홈페이지주소</th>
                <td><input type="text" v-model="bizDetailValue.bizWebUrl" /></td>
              </tr>
              <tr>
                <th>설립일</th>
                <td><input type="date" v-model="bizDetailValue.bizFoundDate" /></td>
              </tr>
              <tr>
                <th>회사소개</th>
                <td><input type="text" v-model="bizDetailValue.bizIntro" /></td>
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
import { useMutation, useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { useModalStore } from "../../../stores/modalState";

const emit = defineEmits(["modalClose"]);
const props = defineProps(["bizIdx"]);

const bizDetailValue = ref({});
const modalStateBiz = useModalStore();

const searchDetail = async () => {
  const param = new URLSearchParams({
    bizIdx: props.bizIdx,
  });

  const result = await axios.post("/api/manage-user/bizManageDetail.do", param);

  return result.data;
};

const {
  data: bizDetail,
  isLoading,
  isSuccess,
  isError,
} = useQuery({
  queryKey: ["bizDetail"],
  queryFn: searchDetail,
  enabled: !!props.bizIdx,
});

const updateBizDetail = async () => {
  if (!checkForm()) {
    return;
  }

  const param = new URLSearchParams({
    ...bizDetailValue.value,
  });

  return await axios.post("/api/manage-user/bizInfoUpdate.do", param);
};

const { mutate: handlerUpdateBtn } = useMutation({
  mutationFn: updateBizDetail,
  mutationKey: ["bizUpdate"],
  onSettled: (data, error) => {
    if (data) {
      handlerModal();
    }
  },
});

const checkForm = () => {
  let inputBizName = bizDetailValue.value.bizName;
  let inputContact = bizDetailValue.value.bizContact;

  const phoneRules = /^\d{2,3}-\d{3,4}-\d{4}$/;

  if (inputBizName.length < 1) {
    alert("사업자명을 입력하세요.");
    return false;
  }

  if (!inputContact) {
    //공백인 경우 저장 가능
  } else if (!phoneRules.test(inputContact)) {
    alert("전화번호 형식을 확인해주세요.");
    return false;
  }

  return true;
};

const handlerModal = () => {
  modalStateBiz.setModalState();
};

watchEffect(() => {
  if (isSuccess.value) {
    bizDetailValue.value = toRaw(bizDetail.value.detail);
  }
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
  width: 500px;
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
  width: 300px;
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
    width: 110px;
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
