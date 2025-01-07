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
                <td>
                  <select v-model="bizDetailValue.bizEmpCount">
                    <option value="10명 이하">10명 이하</option>
                    <option value="50명 이하">50명 이하</option>
                    <option value="100명 이하">100명 이하</option>
                    <option value="1000명 이하">1000명 이하</option>
                    <option value="1000명 이상">1000명 이상</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>매출액</th>
                <td>
                  <select v-model="bizDetailValue.bizRevenue">
                    <option value="10억 이하">10억 이하</option>
                    <option value="100억 이하">100억 이하</option>
                    <option value="1000억 이하">1000억 이하</option>
                    <option value="1000억 이상">1000억 이상</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>연락처</th>
                <td><input type="text" v-model="bizDetailValue.bizContact"
                    placeholder="예시: 02-123-4567, 010-1234-5678" /></td>
              </tr>
              <tr>
                <th>사업자주소</th>
                <td><input type="text" v-model="bizDetailValue.bizAddr" readonly /></td>
                <td><button @click="openDaumPostcode">주소 찾기</button></td>
              </tr>
              <tr>
                <th>홈페이지주소</th>
                <td><input type="text" v-model="bizDetailValue.bizWebUrl" /></td>
              </tr>
              <tr>
                <th>설립일</th>
                <td><input type="date" v-model="bizDetailValue.bizFoundDate" :max="today" /></td>
              </tr>
              <tr>
                <th style="height:170px">회사소개</th>
                <td><textarea rows="6" v-model="bizDetailValue.bizIntro"></textarea></td>
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
import { useModalStore } from "../../../stores/modalState";
import { useBizDetailQuery } from "../../hook/biz/useBizDetailQuery";
import { useBizDetailUpdateMutation } from "../../hook/biz/useBizDetailUpdateMutation";

const emit = defineEmits(["modalClose"]);
const props = defineProps(["bizIdx"]);

const bizDetailValue = ref({});
const modalStateBiz = useModalStore();

const today = computed(() => {
  let now_utc = new Date();
  let timeOff = new Date().getTimezoneOffset() * 60000;
  return new Date(now_utc - timeOff).toISOString().split("T")[0];
})

const {
  data: bizDetail,
  isLoading,
  isSuccess,
  isError,
} = useBizDetailQuery(props);

const openDaumPostcode = () => {
  //카카오API사용
  new daum.Postcode({
    oncomplete: (data) => {
      bizDetailValue.value.bizAddr = data.zonecode;
    },
  }).open();
};

const { mutate: handlerUpdateBtn } = useBizDetailUpdateMutation(bizDetailValue);

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
  width: 250px;
}

textarea {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
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
    width: 110px;
    background-color: #2676bf;
    color: #ddd;
    display: block;
    min-height: 60px;
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
