<template>
  <teleport to="body">
    <div class="backdrop">
      <div class="container">
        <div class="qna">
          <strong>Q&A 등록</strong>
        </div>
        <table class="row">
          <tbody>
            <!-- 제목 -->
            <tr>
              <th scope="row">제목<span class="font_red">*</span></th>
              <td colSpan="3">
                <input
                  type="text"
                  class="inputTxt p100"
                  v-model="qnaDetail.title"
                  :readonly="!!qnaDetail?.ans_content || userInfo.user.userType === 'M'"
                />
              </td>
            </tr>

            <!-- 내용 -->
            <tr>
              <th scope="row">내용<span class="font_red">*</span></th>
              <td colSpan="3">
                <textarea
                  class="inputTxt p100"
                  v-model="qnaDetail.content"
                  rows="5"
                  :readonly="!!qnaDetail?.ans_content || userInfo.user.userType === 'M'"
                ></textarea>
              </td>
            </tr>

            <!-- 파일 첨부 -->
            <tr id="file_column">
              <th scope="row">파일</th>
              <td colSpan="3">
                <input
                  type="file"
                  id="fileInput"
                  style="display: none"
                  @change="handlerSelectFile"
                  :disabled="!!qnaDetail?.ans_content"
                />
                <label class="img-label" for="fileInput">파일 첨부하기</label>

                <!-- 파일 미리보기 -->
                <div @click="handlerDownloadFile">
                  <div v-if="!imageUrl">
                    <label>등록된 파일이 없습니다.</label>
                  </div>
                  <div v-else>
                    <label>미리보기: </label>
                    <img :src="imageUrl" style="width: 100px" />
                  </div>
                </div>
              </td>
            </tr>

            <!-- 비밀번호 (관리자 제외) -->
            <tr v-if="userInfo.user.userType !== 'M' && !qnaDetail?.ans_content">
              <th scope="row">비밀번호<span class="font_red">*</span></th>
              <td colSpan="3">
                <input
                  type="password"
                  class="inputTxt p100"
                  name="password"
                  id="password"
                  v-model="props.password"
                  @focus="
                    (e) => {
                      e.target.type = 'text';
                    }
                  "
                  @blur="
                    (e) => {
                      e.target.type = 'password';
                    }
                  "
                  readonly
                />
              </td>
            </tr>

            <!-- 답변 -->
            <tr v-if="qnaDetail.ans_content || userInfo.user.userType === 'M'">
              <th scope="row">답변</th>
              <td colSpan="3">
                <textarea
                  class="inputTxt p100"
                  v-model="qnaDetail.ans_content"
                  rows="5"
                  :readonly="userInfo.user.userType !== 'M'"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 버튼 영역 -->
        <div class="btn_areaC mt30">
          <!-- 저장 버튼 -->
          <button v-if="userInfo.user.userType !== 'M' && !qnaDetail.qnaIdx" class="btn blue" @click="handlerSaveBtn">
            저장
          </button>

          <!-- 수정 버튼 -->
          <button v-if="userInfo.user.loginId === qnaDetail.author" class="btn blue" @click="handlerUpdateBtn">
            수정
          </button>

          <!-- 답변등록 버튼 (관리자만 볼 수 있음) -->
          <button v-if="userInfo.user.userType === 'M'" class="btn blue" @click="handlerUpdateBtn">답변등록</button>

          <!-- 비밀번호 초기화 -->
          <button v-if="qnaDetail && userInfo.user.userType === 'M'" @click="passwordReset">비밀번호 초기화</button>

          <!-- 삭제 버튼 -->
          <button
            v-if="qnaDetail && (userInfo.user.userType === 'M' || userInfo.user.loginId === qnaDetail.author)"
            class="btn blue"
            @click="handlerDeleteBtn"
          >
            삭제
          </button>

          <!-- 닫기 버튼 -->
          <button class="btn gray" @click="handlerModal">닫기</button>
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

const emits = defineEmits(["postSuccess", "modalClose", "passwordValue"]);
const props = defineProps(["idx", "password"]);
const modal = useModalStore();
const userInfo = useUserInfo();
const qnaDetail = ref({});
const imageUrl = ref("");
const fileData = ref("");
const queryClient = useQueryClient();
const router = useRouter();

const handlerGetModalDetail = () => {
  console.log("여기는 detail props에용", props);
  const param = {
    qnaSeq: props.idx,
    password: props.password,
    userType: userInfo.user.userType,
  };
  //password
  axios.post("/api/board/qnaDetailFileRe.do", param).then((res) => {
    qnaDetail.value = res.data.detail;
    console.log("res", res);
    // if (["jpg", "gif", "png", "webp"].includes(qnaDetail.value.fileExt)) {
    //   handlerGetImage();
    // }
  });
};

const handlerModal = () => {
  modal.setModalState();
};

const handlerSaveBtn = () => {
  const textData = {
    qnaTit: qnaDetail.value.title,
    qnaCon: qnaDetail.value.content,
    password: props.password,
    loginId: userInfo.user.loginId,
  };
  const formData = new FormData();
  if (fileData.value) formData.append("file", fileData.value);
  formData.append("text", new Blob([JSON.stringify(textData)], { type: "application/json" }));
  axios.post("/api/board/qnaFileSaveRe.do", formData).then((res) => {
    if (res.data.result.toUpperCase() === "SUCCESS") {
      emits("postSuccess");
      handlerModal();
      alert("등록 성공했습니다.");
    } else {
      alert("등록 실패했습니다.");
    }
  });
};

const handlerUpdateBtn = () => {
  const textData = {
    qnaTit: qnaDetail.value.title,
    qnaCon: qnaDetail.value.content,
    loginId: userInfo.user.loginId,
    qnaSeq: qnaDetail.value.qnaIdx,
    password: props.password,
    ans_content: qnaDetail.value.ans_content,
  };
  const formData = new FormData();
  if (fileData.value) formData.append("file", fileData.value);
  formData.append("text", new Blob([JSON.stringify(textData)], { type: "application/json" }));
  axios.post("/api/board/qnaFileUpdateRe.do", formData).then((res) => {
    if (res.data.result.toUpperCase() === "SUCCESS") {
      emits("postSuccess");
      handlerModal();
      alert("수정 성공했습니다.");
    } else {
      alert("수정 실패했습니다.");
    }
  });
};

const handlerDeleteBtn = () => {
  axios.post("/api/board/qnaFileDeleteRe.do", { qnaSeq: props.idx }).then((res) => {
    if (res.data.result == "success") {
      emits("postSuccess");
      handlerModal();
    } else {
      alert("삭제를 실패했습니다.");
    }
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
  console.log("여기는 detail", props);
  props.idx && handlerGetModalDetail();
});
watch(
  () => props.idx,
  (newIdx) => {
    if (newIdx) {
      handlerGetModalDetail();
    }
  }
);
onUnmounted(() => {
  emits("modalClose");
});
</script>

<style lang="scss" scoped>
.qna {
  background-color: #3e4463;
  padding: 10px; /* 패딩을 추가하여 내용과 배경이 붙지 않도록 함 */
  color: white; /* 텍스트 색상도 흰색으로 설정 */
  text-align: left;
  margin-top: 20px; /* 원하는 만큼 아래로 띄워줄 여백 추가 */
}
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
.font_red {
  color: red;
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

label {
  display: flex;
  flex-direction: column;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

input[type="text"],
input[type="password"],
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}
textarea {
  resize: none;
  height: 100px;
}

.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 500px;
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
