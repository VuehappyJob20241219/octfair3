<template>
  <teleport to="body">
    <div class="backdrop" @click.self="closeModal">
      <div class="container">
        <div id="printArea">
        <template v-if="resumeDetailinformation">
          <template v-if="resumeDetailinformation.resIdx > 0">
            <div v-for="[key, value] in Object.entries(resumeProperties)" :key="key">
              <div v-if="value">
                <span v-if="resumeBasicLabels[key]">{{ resumeBasicLabels[key] }}: {{ value }}</span>
              </div>
            </div>
              <!-- 경력 -->
              <div v-for="(career, index) in careerProperties" :key="index">
                <div v-for="[key, value] in Object.entries(career)" :key="key">
                  <div v-if="value">
                    <span v-if="careerLabels[key]">{{ careerLabels[key] }} {{ value }}</span>
                  </div>
                </div>
              </div>
            <!-- 학력 -->
              <div v-for="(edu, index) in eduProperties" :key="index">
                <div v-for="[key, value] in Object.entries(edu)" :key="key">
                  <div v-if="value">
                    <span v-if="eduLabels[key]">{{ eduLabels[key] }} {{ value }}</span>
                  </div>
                </div>
              </div>
                <!-- 스킬 -->
              <div v-for="(skill, index) in skillProperties" :key="index">
                <div v-for="[key, value] in Object.entries(skill)" :key="key">
                  <div v-if="value">
                    <span v-if="skillLabels[key]">{{ skillLabels[key] }} {{ value }}</span>
                  </div>
                </div>
              </div>
             <!-- 외국어 -->
              <div v-for="(certification, index) in certProperties" :key="index">
                <div v-for="[key, value] in Object.entries(certification)" :key="key">
                  <div v-if="value">
                    <span v-if="certLabels[key]">{{ certLabels[key] }} {{ value }}</span>
                  </div>
                </div>
              </div>
          </template>
        </template>
      </div>
        <button class="btnType blue" @click="closeModal">닫기</button>
        <button class="btnType gray" @click="printJS('printArea', 'html')">인쇄</button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useModalStore } from "@/stores/modalState";
import axios from "axios";
import { Resume } from "../../../../api/axiosApi/resumeApi";
import { computed } from "vue";
import printJS from 'print-js'

const modalState = useModalStore();
const props = defineProps(["idx"]);
const resumeDetailinformation = ref({
  resIdx: 0,
  resumeInfo: {},
});

const resumeBasicLabels = {
  resTitle: "제목",
  userNm: "이름",
  email: "이메일",
  phone: "핸드폰",
  shortIntro: "간단소개",
  perStatement: "자기소개",
  proLink: "링크",
  fileName: "첨부파일",
};

const careerLabels = {
  company: "회사명:",
  dept:"근무부서:",
  position: "직책/직급:",
  startDate:"근무기간:",
  endDate:"~",
  reason: "퇴사사유:",
  crrDesc: "담당업무:",
};

const eduLabels = {
  eduLevel: "학력구분:",
  schoolName:"학교명:",
  major: "전공명",
  admDate:"재학기간:",
  grdDate:"~",
  grdStatus: "졸업여부:",
};

const skillLabels = {
  skillName: "스킬명:",
  skillDetail: "스킬상세기재:",
};

const certLabels = {
  certName: "자격증명:",
  grade: "등급:",
  issuer: "발행처:",
  acqDate: "취득일:",
};

const resumeProperties = computed(() => {
  return resumeDetailinformation.value.resumeInfo || {}; // resumeInfo가 없을 경우 빈 객체 반환
});

const careerProperties = computed(() => {
  return resumeDetailinformation.value.careerInfo || [];
});

const eduProperties = computed(() => {
  return resumeDetailinformation.value.eduInfo || []; // resumeInfo가 없을 경우 빈 객체 반환
});

const skillProperties = computed(() => {
  return resumeDetailinformation.value.skillInfo || []; // resumeInfo가 없을 경우 빈 객체 반환
});

const certProperties = computed(() => {
  return resumeDetailinformation.value.certInfo || []; // resumeInfo가 없을 경우 빈 객체 반환
});

const closeModal = () => {
  modalState.setModalState();
};

const resumeDetail = async () => {
  await axios.post(Resume.PreviewResume, { resIdx: props.idx }).then((res) => {
    resumeDetailinformation.value = res.data;
  });
};

onMounted(() => {
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
