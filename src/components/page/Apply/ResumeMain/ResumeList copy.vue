<template>
  <button class="newResumeCreateMove" @click="newResumeCreate">새 이력서 작성</button>
  <div class="resume-container">
    <template v-if="resumeMianInfoArray">
      <div class="resume-content">
        <div class="resume-details">
          <div class="resume-photo">
            <div v-if="imageUrl">
              <img :src="imageUrl" class="my-image" />
            </div>
          </div>
          <div class="resume-info">
            <h3 class="resume-title">{{ resumeMianInfoArray.resTitle }}</h3>
            <div class="resume-contact">
              <p><strong>이름:</strong> {{ resumeMianInfoArray.userNm }}</p>
              <p>
                <strong>나이:</strong> {{ calculateAge(resumeMianInfoArray.birthday) }} 세 ({{
                  resumeMianInfoArray.sex === 1 ? "남성" : "여성"
                }})
              </p>
              <p><strong>전화번호:</strong> {{ resumeMianInfoArray.phone }}</p>
              <p><strong>이메일:</strong> {{ resumeMianInfoArray.email }}</p>
              <p>{{ resumeMianInfoArray.shortIntro }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="resume-actions">
        <button class="copy-button" @click="resumeIdxAdd(resumeMianInfoArray.resIdx)">수정하기</button>
        <button class="delete-button" @click="resumeDelete(resumeMianInfoArray.resIdx)">삭제하기</button>
      </div>
    </template>
    <template v-else>
      <p>대표 이력서로 선정된 이력서가 없습니다.</p>
    </template>
  </div>

  <div class="divResumeList">
    현재 페이지:{{ cPage }} 총 개수: {{ resumeInfoArray?.resumeCnt }}
    <table>
      <colgroup>
        <col width="50%" />
        <col width="20%" />
        <col width="15%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">이력서 제목</th>
          <th scope="col">관리</th>
          <th scope="col">최종 수정일</th>
          <th scope="col">대표 이력서 설정</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="resumeInfoArray">
          <template v-if="resumeInfoArray.resumeCnt > 0">
            <tr v-for="resume in resumeInfoArray.resumeList" :key="resume.resIdx">
              <td class="resumeTitle">
                <span @click="resumeIdxAdd(resume.resIdx)"> {{ resume.resTitle }}</span>
              </td>
              <td>
                <button class="copy-button" @click="resumeCopy(resume.resIdx)">복사하기</button>
                <button class="delete-button" @click="resumeDelete(resume.resIdx)">삭제하기</button>
              </td>
              <td>{{ resume.updatedDate }}</td>
              <td>
                <button class="copy-button" @click="mainResume(resume.resIdx)">대표 이력서</button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7">등록된 이력서가 없습니다.</td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <Pagination
      :totalItems="resumeInfoArray?.resumeCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="resumeSearchList"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Resume } from "../../../../api/axiosApi/resumeApi";
import { useUserInfo } from "../../../../stores/userInfo";
import Pagination from "../../../common/Pagination.vue";

const userInfo = useUserInfo();
const { user } = userInfo;
const resumeInfoArray = ref([]);
const cPage = ref(1);
const resumeCopyResult = ref();
const resumeDeleteResult = ref();
const router = useRouter();
const imageUrl = ref("/no_image.jpg");
const resumeMianInfoArray = ref();

const resumeSearchList = async () => {
  const param = {
    loginId: user.loginId,
    userNm: user.userNm,
    userType: user.userType,
    currentPage: cPage.value,
    pageSize: 5,
  };
  await axios
    .post(Resume.ListResume, param)
    .then((res) => {
      resumeInfoArray.value = res.data;
    })
    .catch((error) => {
      console.error("데이터 로드 중 오류 발생:", error);
    });
};

//이력서 복사
const resumeCopy = async (idx) => {
  const param = {
    resIdx: idx,
  };
  await axios.post(Resume.CopyResume, param).then((res) => {
    resumeCopyResult.value = res.data;
    if (resumeCopyResult.value.result === "success") {
      resumeSearchList();
    }
  });
};

//이력서 삭제
const resumeDelete = async (idx) => {
  const param = {
    resIdx: idx,
  };

  await axios.post(Resume.DeleteResume, param).then((res) => {
    resumeDeleteResult.value = res.data;
    if (resumeDeleteResult.value.result === "success") {
      resumeSearchList();
      mainResumeDetail().then(() => {
        mainProfileImage();
      });
    }
  });
};

const newResumeCreate = () => {
  router.push({ name: "resume-new" });
};

const resumeIdxAdd = (resumeidx) => {
  router.push({
    name: "MyResumes",
    query: { resumeNum: resumeidx },
  });
};

const mainResume = async (idx) => {
  const param = {
    loginId: user.loginId,
    userNm: user.userNm,
    userType: user.userType,
    resIdx: idx,
  };
  await axios.post(Resume.MainResume, param).then(() => {
    alert("대표이력서로 설정되었습니다.");
    mainResumeDetail().then(() => {
      mainProfileImage();
    });
  });
};

const mainResumeDetail = async () => {
  const param = {
    loginId: user.loginId,
    userNm: user.userNm,
    userType: user.userType,
  };
  await axios.post(Resume.MainResumeDetail, param).then((res) => {
    resumeMianInfoArray.value = res.data.result;
  });
};

const mainProfileImage = () => {
  const profileImageIdx = resumeMianInfoArray.value.resIdx;
  getFileImage(profileImageIdx);
};

const getFileImage = (idx) => {
  let param = new URLSearchParams();
  param.append("resIdx", idx);
  const postAction = {
    url: "/api/apply/resumeFileDownload.do",
    method: "POST",
    data: param,
    responseType: "blob",
  };
  axios(postAction).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    imageUrl.value = url;
  });
};

const calculateAge = (birthday) => {
  const birthDate = new Date(birthday); // 주어진 생일을 Date 객체로 변환
  const today = new Date(); // 현재 날짜를 Date 객체로 생성

  let age = today.getFullYear() - birthDate.getFullYear(); // 현재 연도에서 태어난 연도를 빼서 나이를 계산
  const monthDifference = today.getMonth() - birthDate.getMonth(); // 현재 월과 생일 월의 차이 계산

  // 생일이 지나지 않은 경우 나이를 하나 줄임
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--; // 생일이 지나지 않았다면 나이를 하나 줄임
  }

  return age;
};

onMounted(() => {
  resumeSearchList().then(() => {
    mainResumeDetail().then(() => {
      mainProfileImage();
    });
  });
});
</script>

<style lang="scss" scoped>
.resume-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 60%;
  margin: 20px auto;
  background-color: #f9f9f9;
  position: relative; /* 부모 요소의 상대 위치 설정 */
}

.resume-content {
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
}

.resume-details {
  display: flex;
  margin-bottom: 10px;
}

.resume-photo {
  flex: 1; /* 사진 영역의 비율 설정 */
  text-align: center;
}

.resume-photo img {
  width: 200px; /* 가로 4.5cm에 해당하는 픽셀 */
  height: 229px; /* 세로 5.79cm에 해당하는 픽셀 */
  object-fit: cover; /* 이미지 비율을 유지하면서 잘리기 */
  border: 2px solid #ccc; /* 이미지 테두리 (선택 사항) */
  margin: 10px; /* 이미지 주변 여백 (필요에 따라 조정) */
}
.resume-info {
  flex: 2; /* 정보 영역의 비율 설정 */
  padding-left: 10px;
  display: flex; /* Flexbox 사용 */
  flex-direction: column; /* 세로 방향으로 배치 */
  align-items: center; /* 수평 중앙 정렬 */
  text-align: left; /* 글자 왼쪽 정렬 */
}

.resume-contact p {
  margin: 5px 0;
  color: #34495e;
}
.resume-actions {
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  position: absolute; /* 버튼을 고정 위치로 설정 */
  bottom: 20px; /* 아래에서의 간격 */
  right: 20px; /* 오른쪽에서의 간격 */
}

.copy-button,
.delete-button {
  padding: 10px 15px;
  margin-left: 10px; /* 버튼 간의 간격 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.newResumeCreateMove {
  position: absolute; /* 부모 컴포넌트 기준 위치 */
  top: 3%; /* divResumeList 상단 위로 배치 */
  right: 12%;
  background-color: #39b0e8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px 0px 0px;
  font-size: 18px;
  text-align: left;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #2676bf;
    color: #ddd;
  }

  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #d3d3d3;
    opacity: 0.9;
    cursor: pointer;
  }
  .resumeTitle {
    font-size: 25px;
  }
  .resumeFile {
    font-size: 15px;
    color: blue;
    text-decoration: underline;
  }
  .resumeFile label:hover {
    cursor: pointer;
  }
  button:hover {
    opacity: 0.9;
  }
}

.copy-button {
  background-color: #39b0e8; /* 초록색 */
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
}

.delete-button {
  background-color: #718da7; /* 빨간색 */
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
}

.file-link {
  color: #36f; /* 파란색 글씨 */
  transition: background-color 0.3s ease; /* 부드러운 배경색 변화 */
}

.file-link:hover {
  background-color: rgba(54, 114, 255, 0.1); /* 호버 시 배경색 변화 */
  text-decoration: underline; /* 호버 시 밑줄 효과 */
}
</style>
