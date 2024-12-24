<template>
  <teleport to="body">
    <div class="backdrop" @click.self="closeModal">
      <div class="container">
        <template v-if="resumeDetailinformation">
          <template v-if="resumeDetailinformation.resIdx > 0">
            <div v-for="[key, value] in Object.entries(resumeProperties)" :key="key">
              <!-- value가 존재할 때만 출력 -->
              <div v-if="value">
                <span v-if="labels[key]">{{ labels[key] }}: {{ value }}</span>
              </div>
            </div>
            <div>{{}}경력</div>
            <div>{{}}학력</div>
            <div>{{}}스킬</div>
            <div>{{}}외국어</div>

            <button class="btnType blue" @click="closeModal">나가기</button>
          </template>
        </template>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useModalStore } from "@/stores/modalState";
import axios from "axios";
import { Resume } from "../../../../api/axiosApi/resumeApi";
import { computed } from "vue";

const modalState = useModalStore();
const props = defineProps(["idx"]);
const resumeDetailinformation = ref({
  resIdx: 0,
  resumeInfo: {},
});

const labels = {
  resTitle: "타이틀",
  userNm: "이름",
  email: "이메일",
  phone: "핸드폰",
  shortIntro: "간단소개",
  perStatement: "자기소개",
  proLink: "링크",
  fileName: "첨부파일",
  updatedDate: "업데이트 날짜",
  empStatus: "고용 상태", // 필요한 라벨 추가
  phsycalPath: "물리적 경로", // 필요한 라벨 추가
  logicalPath: "논리적 경로", // 필요한 라벨 추가
  fileSize: "파일 크기", // 필요한 라벨 추가
  fileExt: "파일 형식", // 필요한 라벨 추가
};

const resumeProperties = computed(() => {
  return resumeDetailinformation.value.resumeInfo || {}; // resumeInfo가 없을 경우 빈 객체 반환
});

const closeModal = () => {
  modalState.setModalState();
};

const resumeDetail = async () => {
  await axios.post(Resume.PreviewResume, { resIdx: props.idx }).then((res) => {
    resumeDetailinformation.value = res.data;
    console.log("resumeDetail 리턴값", resumeDetailinformation.value);
  });
};

onMounted(() => {
  console.log("메인에서 보낸 인덱스 값", props.idx);
  resumeDetail();
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
