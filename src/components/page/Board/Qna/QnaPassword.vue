<template>
  <teleport to="body">
    <div id="backdrop">
      <div id="passwordModal" class="modal-container">
        <div class="modal-content">
          <div class="password">
            <strong>비밀번호 입력</strong>
            <div class="modal-overlay" @Click="handlerModal">X</div>
          </div>
          <div class="passinput">
            <input
              type="text"
              id="passwordInput"
              name="passwordInput"
              v-bind="password"
              @Change="handlePasswordChange"
              placeholder="비밀번호"
              className="inputTxt password"
            />
            <div class="btn_areaC mt30">
              <button @Click="submitPassword;" className="btn blue">
                <span>확인</span>
              </button>
              <button @Click="handlerModal" className="btn gray">
                <span>취소</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useUserInfo } from "@/stores/userInfo";
import axios from "axios";
import { useRouter } from "vue-router";
import { useModalStore } from "../../../../stores/modalState";

const emits = defineEmits(["postSuccess", "modalClose"]);
const props = defineProps(["idx"]);
const modalStore = useModalStore();
const userInfo = useUserInfo();
const qnaDetail = ref({});
const imageUrl = ref("");
const fileData = ref("");
const queryClient = useQueryClient();
const router = useRouter();

const handlerModal = () => {
  modalStore.setModalState(!modalStore.modalState);
  console.log("여기는 detail modalStore", modalStore);
};

const handlerSaveBtn = () => {
  const textData = {
    ...qnaDetail.value, // title, context
    loginId: userInfo.user.loginId,
  };
  const formData = new FormData();
  if (fileData.value) formData.append("file", fileData.value);
  formData.append("text", new Blob([JSON.stringify(textData)], { type: "application/json" }));
  axios.post("/api/board/qnaFileSaveRe.do", formData).then((res) => {
    if (res.data.result.toUpperCase() === "SUCCESS") {
      handlerModal();
      emits("postSuccess");
    }
  });
};

const handlerUpdateBtn = () => {
  const textData = {
    ...qnaDetail.value, // title, context
    loginId: userInfo.user.loginId,
    qnaSeq: qnaDetail.value.qnaIdx,
  };
  const formData = new FormData();
  if (fileData.value) formData.append("file", fileData.value);
  formData.append("text", new Blob([JSON.stringify(textData)], { type: "application/json" }));
  axios.post("/api/board/qnaFileUpdateRe.do", formData).then((res) => {
    if (res.data.result.toUpperCase() === "SUCCESS") {
      handlerModal();
      emits("postSuccess");
    }
  });
};

const handlerDeleteBtn = () => {
  axios.post("/api/board/qnaFileDeleteRe.do", { qnaSeq: props.idx }).then((res) => {
    handlerModal();
    emits("postSuccess");
  });
};

const handlerSelectFile = (e) => {
  const fileInfo = e.target.files;
  const fileInfoSplit = fileInfo[0].name.split(".");
  const fileExtension = fileInfoSplit[1].toLowerCase();

  if (["jpg", "gif", "png", "webp"].includes(fileExtension)) imageUrl.value = URL.createObjectURL(fileInfo[0]);
  fileData.value = fileInfo[0];
};

const handlerGetImage = () => {
  let param = new URLSearchParams();
  param.append("qnaSeq", props.idx);
  const postAction = {
    url: "/api/board/qnaDownload.do",
    method: "POST",
    data: param,
    responseType: "blob",
  };

  axios(postAction).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    imageUrl.value = url;
  });
};

const handlerDownloadFile = () => {
  let param = new URLSearchParams();
  param.append("qnaSeq", props.idx);
  const postAction = {
    url: "/api/board/qnaDownload.do",
    method: "POST",
    data: param,
    responseType: "blob",
  };

  axios(postAction).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", qnaDetail.value.fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

onMounted(() => {
  props.idx && handlerGetModalDetail();
});
onUnmounted(() => {
  emits("modalClose");
});
</script>

<style lang="scss" scoped>
#backdrop {
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  position: fixed; // modal을 부모범위가 아니라 전체창범위에 소환하게 해주는 코드
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  font-weight: bold;
}
#passwordModal {
  width: 300px;
}
.qna {
  background-color: #3e4463;
  padding: 10px; /* 패딩을 추가하여 내용과 배경이 붙지 않도록 함 */
  color: white; /* 텍스트 색상도 흰색으로 설정 */
  text-align: left;
  margin-top: 20px; /* 원하는 만큼 아래로 띄워줄 여백 추가 */
}

.password {
  background-color: #3e4463;
  padding: 10px; /* 패딩을 추가하여 내용과 배경이 붙지 않도록 함 */
  color: white; /* 텍스트 색상도 흰색으로 설정 */
  text-align: left;
  margin-bottom: 20px; /* .passinput와의 간격을 띄우기 위해 margin-bottom 추가 */
}

.passinput input {
  width: 100%;
  background-color: #f9f9f9;
  color: black; /* 텍스트 색상도 흰색으로 설정 */
  height: 35px; /* 원하는 높이로 설정 */
  font-size: 14px; /* 폰트 크기 조정 */
  padding: 5px; /* 패딩 조정 (너비에 영향을 미침) */
  border-radius: 4px; /* 테두리 반경 (옵션) */
  -webkit-text-security: disc; /* 입력된 텍스트를 점으로 보이게 함 (Webkit 기반 브라우저에서 작동) */
}

.modal-container {
  position: relative;
  width: 600px;
  background: #f3f3f3; /* 배경색 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  font-family: "Arial", sans-serif;
}

.modal-content {
  position: relative;
  width: 100%;
}

.modal-overlay {
  position: absolute;
  top: 10px;
  right: 15px; /* 오른쪽 상단으로 이동 */
  color: black;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  background: transparent;
  border: none;
  margin-bottom: 10px; /* 아래 여백 추가 */
}

h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: white; /* 제목 색상 */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th {
  text-align: center; /* 수평 중앙 정렬 */
  vertical-align: middle; /* 수직 중앙 정렬 */
  padding: 10px;
  font-size: 14px;
  color: #333;
  width: 120px;
  background: #bbc2cd; /* 배경색 */
}

td {
  padding: 10px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

textarea {
  resize: none;
  height: 100px;
}

.required {
  color: red;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

button {
  background-color: #87ceeb;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 4px #999;
  transition: 0.3s;

  &:hover {
    background-color: #d6effc;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}

.btn.gray {
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }

  &:active {
    background-color: #545b62;
  }
}
</style>
