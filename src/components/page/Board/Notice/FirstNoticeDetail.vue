<template>
  <teleport to="body">
    <div class="backdrop">
      <div class="container">
        <div v-if="isLoading">기다려주세요</div>
        <div v-else>
          <ContextBox>공지사항 상세조회</ContextBox>
          <label> 제목 :<input type="text" v-model="detailValue.title" /> </label>
          <label>
            내용 :{{ imageUrl }}
            <input type="text" v-model="detailValue.content" />
          </label>
          파일 :<input type="file" style="display: none" id="fileInput" @change="handlerFile" />
          <label class="img-label" htmlFor="fileInput"> 파일 첨부하기 </label>
          <div>
            <div v-if="imageUrl">
              <label>미리보기</label>
              <img :src="imageUrl" />
            </div>
            <div v-else>
              <label>파일명</label>
            </div>
          </div>
          <div class="button-box">
            <button @click="params.idx ? handlerUpdateBtn() : handlerInsertBtn()">
              {{ params.idx ? "수정" : "저장" }}
            </button>
            <button v-if="params.idx" @click="handlerDeleteBtn">삭제</button>
            <button @click="$router.go(-1)">뒤로가기</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useUserInfo } from "../../../../stores/userInfo";
import { useNoticeDetailDeleteMutation } from "../../../hook/notice/useNoticeDetailDeleteMutation";
import { useNoticeDetailInsertMutation } from "../../../hook/notice/useNoticeDetailInsertMutation";
import { useNoticeDetailUpdateMutation } from "../../../hook/notice/useNoticeDetailUpdateMutation";

const { params } = useRoute();
const detailValue = ref({});
const userInfo = useUserInfo();
const userid = userInfo.user.loginId;
const props = defineProps(["idx"]);
const notiseIdx = params.idx;
const fileData = ref("");
const imageUrl = ref("");

const searchDetail = async () => {
  const result = await axios.post(`/api/board/noticeDetailBody.do`, {
    noticeSeq: params.idx,
  });

  return result.data;
};

const getFileImage = () => {
  let param = new URLSearchParams();
  param.append("noticeSeq", props.idx);
  const postAtion = {
    url: "/api/board/noticeDownload.do",
    method: "POST",
    data: param,
    responseType: "blob",
  };
  axios(postAtion).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    imageUrl.value = url;
  });
};

const {
  data: noticeDetail,
  isLoading,
  isSuccess,
} = useQuery({
  queryKey: ["noticeDetail"],
  queryFn: searchDetail,
  enabled: !!params.idx,
  //유즈쿼리 조건문 !!는 무조건 false
});
// useQuery 화면이 시작될 때 자동 실행

const { mutate: handlerInsertBtn } = useNoticeDetailInsertMutation(detailValue, fileData, userid);
const { mutate: handlerUpdateBtn } = useNoticeDetailUpdateMutation(detailValue, fileData, params.idx);
const { mutate: handlerDeleteBtn } = useNoticeDetailDeleteMutation(notiseIdx);

const handlerFile = (e) => {
  const fileinfo = e.target.files;
  const fileinfoSplit = fileinfo[0].name.split(".");
  const fileExtension = fileinfoSplit[1].toLowerCase();
  if (fileExtension === "jpg" || fileExtension === "gif" || fileExtension === "png" || fileExtension === "webp") {
    imageUrl.value = URL.createObjectURL(fileinfo[0]);
  }
  fileData.value = fileinfo[0];
};

watchEffect(() => {
  if (isSuccess.value && noticeDetail.value) {
    detailValue.value = toRaw(noticeDetail.value.detail);
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
