<template>
  <teleport to="body">
    <div class="backdrop" @click.self="closeModal">
      <div class="container">
        <div id="printArea">
          <div class="resumePreviewTitle">이력서 미리보기</div>
<<<<<<< HEAD
          <template v-if="resumeDetailinformation">
            <div style="margin-bottom: 20px">
              <p style="white-space: pre-line; font-size: 25px; font-weight: 900">{{ resumeProperties.resTitle }}</p>
            </div>
            <div style="margin-bottom: 5px" v-if="resumeProperties.userNm">
              <p style="white-space: pre-line; font-size: 15px; font-weight: 500">
                이름 : {{ resumeProperties.userNm }}
              </p>
            </div>
            <div style="margin-bottom: 5px">
              <p style="white-space: pre-line; font-size: 15px; font-weight: 500">
                이메일 : {{ resumeProperties.email }}
              </p>
            </div>
            <div style="margin-bottom: 10px">
              <p style="white-space: pre-line; font-size: 15px; font-weight: 500">
                연락처 : {{ resumeProperties.phone }}
              </p>
            </div>
            <div style="margin-top: 20px; padding: 15px; border-top: 1px solid #ccc">
              <div>
                <p style="white-space: pre-line">{{ resumeProperties.shortIntro }}</p>
              </div>
              <div style="" v-if="resumeProperties.proLink">
                <p style="white-space: pre-line">
                  링크 :
                  <a style="color: #36f" :href="resumeProperties.proLink">{{ resumeProperties.proLink }}</a>
                </p>
              </div>
              <div v-if="resumeProperties.fileName" @click="ResumeFileDownload" class="file-download">
                <p style="white-space: pre-line">
                  첨부파일 :
                  <span class="file-link">{{ resumeProperties.fileName }}</span>
                </p>
              </div>
            </div>
          </template>
          <!-- 경력 -->
          <template v-if="careerProperties.length > 0">
            <div style="padding: 15px">
              <div
                style="
                  font-size: 1.2em;
                  font-weight: bold;
                  color: #333;
                  padding: 10px;
                  border-top: 1px solid #000;
                  border-bottom: 1px solid #ccc;
                "
              >
                경력
              </div>
              <div>
                <ul style="list-style: none; padding: 0">
                  <div v-for="(career, index) in careerProperties" :key="index">
                    <li
                      style="
                        padding: 15px;
                        border-bottom: 2px solid #f1f1f1;
                        display: flex;
                        align-items: flex-start;
                        align-items: center;
                      "
                    >
                      <!-- 날짜 데이터 -->
                      <div style="flex: 1; text-align: center; font-weight: 800">
                        <span>
                          {{ career.startDate.substr(0, 7) }}
                          ~
                          {{ career.endDate.substr(0, 7) }}
                        </span>
                      </div>
                      <!-- 나머지 데이터 -->
                      <div style="flex: 4; padding-left: 10px">
                        <div style="flex: 3; padding-left: 10px">
                          <div style="display: flex; align-items: center; margin-bottom: 20px">
                            <div style="font-weight: 900; font-size: 20px; margin-left: 5px">{{ career.company }}</div>
                            <div style="font-weight: 900; margin-left: 10px">
                              &nbsp; {{ career.dept }} | {{ career.position }}
                            </div>
                          </div>
                        </div>
                        <div style="margin-top: 20px; white-space: pre-line">
                          <p>{{ career.crrDesc }}</p>
                        </div>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </template>
=======
          <!-- 이력서 사진 작업 -->
          <div style="display: flex; border: 2px solid #ccc; padding: 5px; margin-top: 10px">
            <div class="file-container" style="margin: 20px">
              <div v-if="imageUrl">
                <img :src="imageUrl" class="my-image" />
              </div>
            </div>
            <div>
              <template v-if="resumeDetailinformation" style="flex: 1">
                <div style="margin-top: 40px">
                  <p style="white-space: pre-line; font-size: 25px; font-weight: 900">
                    {{ resumeProperties.resTitle }}
                  </p>
                </div>
                <div style="margin-left: 10px" v-if="resumeProperties.userNm">
                  <p style="white-space: pre-line; font-size: 15px; font-weight: 500">
                    이름 : {{ resumeProperties.userNm }}
                  </p>
                </div>
                <div style="margin-left: 10px">
                  <p style="white-space: pre-line; font-size: 15px; font-weight: 500">
                    이메일 : {{ resumeProperties.email }}
                  </p>
                </div>
                <div style="margin-left: 10px">
                  <p style="white-space: pre-line; font-size: 15px; font-weight: 500">
                    연락처 : {{ resumeProperties.phone }}
                  </p>
                </div>
              </template>
            </div>
          </div>
          <div style="margin-top: 20px; padding: 15px; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc">
            <div>
              <p style="white-space: pre-line">{{ resumeProperties.shortIntro }}</p>
            </div>
          </div>
          <div style="margin-left: 20px; margin-top: 20px" v-if="resumeProperties.proLink">
            <p style="white-space: pre-line">
              링크 :
              <a style="color: #36f" :href="resumeProperties.proLink">{{ resumeProperties.proLink }}</a>
            </p>
          </div>
          <div
            v-if="resumeProperties.fileName"
            @click="ResumeFileDownload"
            class="file-download"
            style="margin-left: 20px"
          >
            <p style="white-space: pre-line">
              첨부파일 :
              <span class="file-link">{{ resumeProperties.fileName }}</span>
            </p>
          </div>
          <!-- 경력 -->
          <template v-if="careerProperties.length > 0">
            <div style="padding: 15px">
              <div
                style="
                  font-size: 1.2em;
                  font-weight: bold;
                  color: #333;
                  padding: 10px;
                  border-top: 1px solid #000;
                  border-bottom: 1px solid #ccc;
                "
              >
                경력
              </div>
              <div>
                <ul style="list-style: none; padding: 0">
                  <div v-for="(career, index) in careerProperties" :key="index">
                    <li
                      style="
                        padding: 15px;
                        border-bottom: 2px solid #f1f1f1;
                        display: flex;
                        align-items: flex-start;
                        align-items: center;
                      "
                    >
                      <!-- 날짜 데이터 -->
                      <div style="flex: 1; text-align: center; font-weight: 800">
                        <span>
                          {{ career.startDate.substr(0, 7) }}
                          ~
                          {{ career.endDate.substr(0, 7) }}
                        </span>
                      </div>
                      <!-- 나머지 데이터 -->
                      <div style="flex: 4; padding-left: 10px">
                        <div style="flex: 3; padding-left: 10px">
                          <div style="display: flex; align-items: center; margin-bottom: 20px">
                            <div style="font-weight: 900; font-size: 20px; margin-left: 5px">{{ career.company }}</div>
                            <div style="font-weight: 900; margin-left: 10px">
                              &nbsp; {{ career.dept }} | {{ career.position }}
                            </div>
                          </div>
                        </div>
                        <div style="margin-top: 20px; white-space: pre-line">
                          <p>{{ career.crrDesc }}</p>
                        </div>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </template>
>>>>>>> 6ccbee06a592cd71e9fd7bbb3c80c81e210494e4
          <!-- 학력 -->
          <template v-if="eduProperties.length > 0">
            <div style="margin-top: 20px; padding: 15px">
              <div
                style="
                  font-size: 1.2em;
                  font-weight: bold;
                  color: #333;
                  padding: 10px;
                  border-top: 1px solid #000;
                  border-bottom: 1px solid #ccc;
                "
              >
                학력
              </div>
              <div>
                <ul style="list-style: none; padding: 0">
                  <div v-for="(edu, index) in eduProperties" :key="index">
                    <li
                      style="
                        padding: 15px;
                        border-bottom: 2px solid #f1f1f1;
                        display: flex;
                        align-items: flex-start;
                        align-items: center;
                        display: flex;
                      "
                    >
                      <div style="flex: 1; width: 20%; padding-left: 10px">
                        <span style="font-weight: 900">
                          <span>
                            {{ edu.admDate.substr(0, 7) }}
                            ~
                            {{ edu.grdDate.substr(0, 7) }}
                          </span>
                        </span>
                      </div>

                      <div style="flex: 3; width: 60%; padding-left: 10px">
                        <span style="font-weight: 900; font-size: 15px"> {{ edu.schoolName }} </span>
                        <template v-if="edu.major">
                          <span style="font-weight: 900"> | {{ edu.major }} </span>
                        </template>
                      </div>
                      <div style="flex: 1; width: 20%; text-align: left; font-weight: 500">
                        <span>{{ edu.grdStatus }} </span>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </template>
          <!-- 스킬 -->
          <template v-if="skillProperties.length > 0">
            <div style="margin-top: 20px; padding: 15px">
              <div
                style="
                  font-size: 1.2em;
                  font-weight: bold;
                  color: #333;
                  padding: 10px;
                  border-top: 1px solid #000;
                  border-bottom: 1px solid #ccc;
                "
              >
                스킬
              </div>
              <div>
                <ul style="list-style: none; padding: 0">
                  <div v-for="(skill, index) in skillProperties" :key="index">
                    <li
                      style="
                        padding: 15px;
                        border-bottom: 2px solid #f1f1f1;
                        display: flex;
                        align-items: flex-start;
                        align-items: center;
                        display: flex;
                      "
                    >
                      <div style="flex: 1; width: 20%; padding-left: 10px">
                        <span style="font-weight: 900">
                          <span>
                            {{ skill.skillName }}
                          </span>
                        </span>
                      </div>
                      <div style="flex: 3; width: 60%; padding-left: 10px">
                        <span style="font-weight: 900; font-size: 15px"> {{ skill.skillDetail }} </span>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </template>
          <!-- 외국어 -->
          <template v-if="certProperties.length > 0">
            <div style="margin-top: 20px; padding: 15px">
              <div
                style="
                  font-size: 1.2em;
                  font-weight: bold;
                  color: #333;
                  padding: 10px;
                  border-top: 1px solid #000;
                  border-bottom: 1px solid #ccc;
                "
              >
                자격증 및 외국어
              </div>
              <div>
                <ul style="list-style: none; padding: 0">
                  <div v-for="(cert, index) in certProperties" :key="index">
                    <li
                      style="
                        padding: 15px;
                        border-bottom: 2px solid #f1f1f1;
                        display: flex;
                        align-items: flex-start;
                        align-items: center;
                        display: flex;
                      "
                    >
                      <div style="flex: 1; width: 20%; padding-left: 10px">
                        <span style="font-weight: 900">
                          <span>
                            {{ cert.acqDate.substr(0, 7) }}
                          </span>
                        </span>
                      </div>

                      <div style="flex: 2; width: 60%; padding-left: 10px">
                        <span style="font-weight: 900; font-size: 15px"> {{ cert.certName }} </span>
                      </div>
                      <div style="flex: 1; width: 60%; padding-left: 10px">
                        <span style="font-weight: 900"> {{ cert.grade }} </span>
                      </div>
                      <div style="flex: 1; width: 20%; text-align: left; font-weight: 500">
                        <span>{{ cert.issuer }} </span>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </template>
        </div>
        <div class="button-container">
          <button class="btnType blue" @click="closeModal">닫기</button>
          <button class="btnType gray" @click="printPage">인쇄</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useModalStore } from "@/stores/modalState";
import axios from "axios";
import printJS from "print-js";
import { computed } from "vue";
import { Resume } from "../../../../api/axiosApi/resumeApi";

const modalState = useModalStore();
const props = defineProps(["idx"]);
const resumeDetailinformation = ref({
  resIdx: 0,
  resumeInfo: {},
});
<<<<<<< HEAD
=======
const imageUrl = ref("/no_image.jpg");
>>>>>>> 6ccbee06a592cd71e9fd7bbb3c80c81e210494e4

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
    getFileImage();
  });
};

const getFileImage = () => {
  let param = new URLSearchParams();
  param.append("resIdx", props.idx);
  const postAction = {
    url: "/api/apply/resumeFileDownload.do",
    method: "POST",
    data: param,
    responseType: "blob",
  };
  axios(postAction).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    imageUrl.value = url;
    console.log(res);
  });
};

const printPage = () => {
  printJS({
    printable: "printArea", //영역 id 값
    type: "html",
    targetStyles: ["*"],
    maxWidth: "100%",
  });
};

const ResumeFileDownload = () => {
  let param = new URLSearchParams();
  param.append("resIdx", props.idx);
  const postAction = {
    url: "/api/apply/resumeFileDownload.do",
    method: "POST",
    data: param,
    responseType: "blob",
  };
  axios(postAction).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", resumeProperties.value.fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

const printPage = () => {
  printJS({
    printable: "printArea", //영역 id 값
    type: "html",
    targetStyles: ["*"],
    maxWidth: "100%",
  });
};

const ResumeFileDownload = () => {
  let param = new URLSearchParams();
  param.append("resIdx", props.idx);
  const postAction = {
    url: "/api/apply/resumeFileDownload.do",
    method: "POST",
    data: param,
    responseType: "blob",
  };
  axios(postAction).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", resumeProperties.value.fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
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
<<<<<<< HEAD
  height: 800px;
=======
  height: 600px;
>>>>>>> 6ccbee06a592cd71e9fd7bbb3c80c81e210494e4
  overflow: auto;
}

img {
  width: 200px;
  height: 200px;
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
<<<<<<< HEAD
=======
}

.my-image {
  width: 170px; /* 가로 4.5cm에 해당하는 픽셀 */
  height: 229px; /* 세로 5.79cm에 해당하는 픽셀 */
  object-fit: cover; /* 이미지 비율을 유지하면서 잘리기 */
  border: 2px solid #ccc; /* 이미지 테두리 (선택 사항) */
  margin: 10px; /* 이미지 주변 여백 (필요에 따라 조정) */
>>>>>>> 6ccbee06a592cd71e9fd7bbb3c80c81e210494e4
}
</style>
