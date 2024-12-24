<template>
  <div>
    <div v-if="isLoading">...로딩중</div>
    <div v-else>
      <ContextBox>QNA 상세조회</ContextBox>
      <label> 제목 :<input type="text" v-model="detailValue.title" /> </label>
      <label> 내용 :<input type="text" v-model="detailValue.content" /> </label>
      <label> 파일 :<input type="file" id="fileInput" style="display: none" @change="handlerSelectFileBtn" /> </label>
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
        <button
          
          @click="detailValue.qnaIdx ? handlerUpdateNoticeBtn() : handlerSaveNoticeBtn()"
        >
          {{ detailValue.qnaIdx ? "수정" : "저장" }}
        </button>
        <button @click="handlerDeleteQnaBtn" v-if= "detailValue.qnaIdx">
          삭제
        </button>
        <button @click="router.go(-1)">뒤로가기</button>
      </div>
    </div>
    <div v-if="isError">...에러</div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useUserInfo } from "@/stores/userInfo";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { useModalStore } from "@/stores/modalState";
import axios from "axios";
import { useQnaDetailSaveMutation } from "../../../../hook/qna/useQnaDetailSaveMutation";
import { useQnaDetailUpdateMutation } from "../../../../hook/qna/useQnaDetailUpdateMutation";
import { useQnaDetailDeleteMutation } from "../../../../hook/qna/useQnaDetailDeleteMutation";
import { useQnaImageGetMutation } from "../../../../hook/qna/useQnaImageGetMutation";
import { useQnaDetailGetQuery } from "../../../../hook/qna/useQnaDetailGetQuery";
import { qnaImageGetApi } from "../../../../api/qna/qnaImageGetApi";

const router = useRouter();
const { params } = useRoute();
const userInfo = useUserInfo();
const detailValue = ref({});
const fileData = ref("");
const imageUrl = ref("");
const queryClient = useQueryClient();
const modalStore = useModalStore();

const {
  data: noticeDetail,
  isLoading,
  isSuccess,
  isError,
} = useQnaDetailGetQuery(detailValue, params.idx, fileData);
const { mutate: handlerSaveQnaBtn } = useQnaDetailSaveMutation(detailValue, params.idx, fileData);
const { mutate: handlerUpdateQnaBtn } = useQnaDetailUpdateMutation(detailValue, params.idx, fileData);
const { mutate: handlerDeleteQnaBtn } = useQnaDetailDeleteMutation(detailValue, params.idx, fileData);
const { mutate: handlerSelectFileBtn } = useQnaImageGetMutation(detailValue, params.idx, fileData, imageUrl);

watchEffect(() => {
  if (isSuccess.value && qnaDetail.value && params.idx) {
    detailValue.value = toRaw(qnaDetail.value.detail);
    if (["jpg", "gif", "png", "webp"].includes(detailValue.value.fileExt)) {
      qnaImageGetApi(imageUrl, params.idx); // Blob방식URL: logicalPath와 달리 클라이언트에 미리 다운시킨 캐시이미지를 보게되는 방식
      // imageUrl.value = '/api'+noticeDetail.value.detail.logicalPath;
    }
  }
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
