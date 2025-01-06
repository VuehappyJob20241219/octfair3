<template>
  <teleport to="body">
    <div class="backdrop" @click.self="handlerModal">
      <div class="container">
        <div class="applyResumeList">
          <div class="resumePreviewTitle">입사 지원</div>
          <p>{{ props.scrap?.postBizName || props.bizDetail?.bizName }}</p>
          <p>{{ props.scrap?.postTitle || props.postDetail?.title }}</p>
          <hr />
          <template
            v-if="resumeMianInfoArray"
            class="mainResume"
            style="background-color: #f0f8ff; border: 2px solid #3bb2ea"
          >
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px">
                <div>
                  대표이력서:
                  <p>{{ resumeMianInfoArray.resTitle }}</p>
                  <p>{{ resumeMianInfoArray.phone }}</p>
                  <p>{{ resumeMianInfoArray.email }}</p>
                </div>
                <input
                  type="radio"
                  name="scrapSelect"
                  :checked="resumeIdx === resumeMianInfoArray.resIdx"
                  @change="handlerRadioChange(resumeMianInfoArray.resIdx)"
                />
              </div>
              <hr style="border: none; border-top: 3px solid #ccc" />
            </div>
          </template>
          <template v-if="userResumes && userResumes.length > 0">
            <div v-for="resume in userResumes" v-bind:key="resume.resumeIdx">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px">
                <div>
                  <p>{{ resume.resumeTitle }}</p>
                  <p>{{ resume.userEmail }}</p>
                  <p>{{ resume.userPhone }}</p>
                </div>
                <input
                  type="radio"
                  name="scrapSelect"
                  :checked="resumeIdx === resume.resumeIdx"
                  @change="handlerRadioChange(resume.resumeIdx)"
                />
              </div>
              <hr style="border: none; border-top: 3px solid #ccc" />
            </div>
          </template>
          <template v-else>
            <p>등록된 이력서가 없습니다.</p>
          </template>
          <div>
            <button variant="secondary" @click="handlerApply">입사지원</button>
            <button @click="handlerModal">나가기</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup>
import { useModalStore } from "@/stores/modalState";
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import "bootstrap-vue-3";
import { ref } from "vue";
import { Resume } from "../../../../api/axiosApi/resumeApi";
import { useUserInfo } from "../../../../stores/userInfo";

const modalState = useModalStore();
const props = defineProps({
  pIdx: Number,
  bIdx: Number,
  scrap: { type: [Object, null], default: null },
  postDetail: { type: [Object, null], default: null },
  bizDetail: { type: [Object, null], default: null },
});
const emit = defineEmits(["postSuccess", "modalClose"]);
const userResumes = ref(null);
const userInfo = useUserInfo();
const resumeIdx = ref(0);
const resumeMianInfoArray = ref();

const resumeList = async () => {
  const param = {
    loginId: userInfo.user.loginId,
  };
  const result = await axios.post("/api/jobs/applyUserResumeDetailBody.do", param);
  if (result.data) {
    userResumes.value = result.data.userResumeList;
    mainResumeDetail();
  }
  return result.data;
};

const mainResumeDetail = async () => {
  const param = {
    loginId: userInfo.user.loginId,
    userNm: userInfo.user.userNm,
    userType: userInfo.user.userType,
  };
  await axios.post(Resume.MainResumeDetail, param).then((res) => {
    resumeMianInfoArray.value = res.data.result;
  });
};

const { data, isLoading, refetch, isSuccess, isError } = useQuery({
  queryKey: ["ResumeList"],
  queryFn: resumeList,
});

const handlerApply = () => {
  if (!resumeIdx.value) {
    alert("이력서를 선택하세요.");
    return;
  }
  saveApply();
};

const saveApply = async () => {
  const postIdx = props.scrap ? props.scrap.postIdx : props.pIdx;

  const request = {
    postIdx: postIdx,
    resIdx: resumeIdx.value,
    loginId: userInfo.user.loginId,
  };

  console.log(request);
  const response = await axios.post("/api/jobs/saveApplyBody.do", request);

  if (response?.data.result === "success") {
    alert("이력서가 지원 완료되었습니다.");
    handlerModal();
  } else if (response?.message === "이미 지원 완료된 공고입니다.") {
    alert("이미 지원 완료된 공고입니다.");
  }
};

const handlerModal = () => {
  modalState.setModalState();
};

const handlerRadioChange = (idx) => {
  resumeIdx.value = idx;
};

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
  z-index: 1000;
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
.resumePreviewTitle {
  background-color: #3e4463; /* 원하는 배경색 */
  color: white; /* 글자 색상 변경 (선택 사항) */
  padding: 5px; /* 내부 여백 */
  width: 100%; /* 부모 요소에 맞게 넓이 설정 */
  position: relative; /* 부모 요소에 독립적으로 위치 */
  border-radius: 4px;
}
.container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 800px;
  height: 800px;
  overflow: auto;
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

.button-container {
  display: flex; /* Flexbox 사용 */
  justify-content: center; /* 수평 중앙 정렬 */
  gap: 10px; /* 버튼 사이 간격 (선택적) */
  margin-top: 20px; /* 위쪽 여백 (선택적) */
}

.button-box {
  text-align: right;
  margin-top: 10px;
}

.file-download {
  cursor: pointer; /* 커서를 포인터로 변경 */
}

.file-link {
  color: #36f; /* 파란색 글씨 */
  transition: background-color 0.3s ease; /* 부드러운 배경색 변화 */
}

.file-link:hover {
  background-color: rgba(54, 114, 255, 0.1); /* 호버 시 배경색 변화 */
  text-decoration: underline; /* 호버 시 밑줄 효과 */
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
    background-color: #4583a0;
  }

  &:active {
    background-color: #4583a0;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }

  .btnType {
    background-color: #3bb2ea; /* 기본 배경 색상 */
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
      background-color: #4583a0;
    }

    &:active {
      background-color: #4583a0;
      box-shadow: 0 2px #666;
      transform: translateY(2px);
    }
  }

  .btnType.gray {
    background-color: #6c757d; /* 회색 버튼 */
  }

  .btnType.blue {
    background-color: #007bff; /* 파란색 버튼 */
  }

  .btnType.gray:hover {
    background-color: #5a6268; /* 회색 버튼 호버 색상 */
  }

  .btnType.blue:hover {
    background-color: #0056b3; /* 파란색 버튼 호버 색상 */
  }
}
</style>
