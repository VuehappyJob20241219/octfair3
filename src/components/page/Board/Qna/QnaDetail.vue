<template>
  <teleport to="body">
    <div class="backdrop">
      <div class="container">
        <label> 제목 :<input type="text" v-model="qnaDetail.title" /> </label>
        <label> 내용 :<input type="text" v-model="qnaDetail.context" /> </label>
        <label> 파일 :<input type="file" id="fileInput" style="display: none" @change="handlerSelectFile" /> </label>
        <label class="img-label" htmlFor="fileInput"> 파일 첨부하기 </label>
        <div @click="handlerDownloadFile">
          <div v-if="!imageUrl">
            <label> 파일명 :</label>
          </div>
          <div v-else>
            <label> 미리보기 : </label>
            <img :src="imageUrl" />
          </div>
        </div>
        <div class="button-box">
          <button v-on:click="qnaDetail.qnaIdx ? handlerUpdateBtn() : handlerSaveBtn()">
            {{ qnaDetail.qnaIdx ? "수정" : "저장" }}
          </button>
          <button v-on:click="handlerDeleteBtn" v-if="props.idx">삭제</button>
          <button v-on:click="handlerModal">나가기</button>
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

const handlerGetModalDetail = () => {
  axios.post("/api/board/qnaDetailFileRe.do", { qnaSeq: props.idx }).then((res) => {
    qnaDetail.value = res.data.detail;
    qnaDetail.value.context = res.data.detail.content; // 변수명 오타 차이
    console.log("qnaDetail", qnaDetail);
    console.log("res", res);
    if (["jpg", "gif", "png", "webp"].includes(qnaDetail.value.fileExt)) {
      handlerGetImage();
      // 1. 위와 같은 Blob방식URL을 줄 시 사용자의 다운로드 의사와 상관없이 사용자의 브라우저 캐시에 이미 저장되며
      // 사용자가 조회/다운로드 원할 시 브라우저 캐시에서 받아오게 됨
      // 2. 아래와 같은 방식으로 URL을 줄 시 physicalPath라면 운영서버에 직접접근이 가능해져버리고
      // logicalPath라면 파일서버에 직접접근이 가능해져버림
      // imageUrl.value = '/api'+noticeDetail.value.logicalPath;
    }
  });
};

const handlerModal = () => {
  modalStore.setModalState();
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
.backdrop {
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
}

.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 400px;
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
  margin-top: 10px;
}
button {
  background-color: #3bb2ea;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: right;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
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
</style>
