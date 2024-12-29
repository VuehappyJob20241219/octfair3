<template>
  <button class="newResumeCreateMove" @click="newResumeCreate">새 이력서 작성</button>
  <div class="divResumeList">
    현재 페이지:{{ cPage }} 총 개수: {{ resumeInfoArray?.resumeCnt }}
    <table>
      <colgroup>
        <col width="50%" />
        <col width="30%" />
        <col width="20%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">이력서 제목</th>
          <th scope="col">관리</th>
          <th scope="col">최종 수정일</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="resumeInfoArray">
          <template v-if="resumeInfoArray.resumeCnt > 0">
            <tr v-for="resume in resumeInfoArray.resumeList" :key="resume.resIdx">
              <td class="resumeTitle">
               <span @click="resumeIdxAdd(resume.resIdx)"> {{ resume.resTitle }}</span>
                <div class="resumeFile" @click="fileDownload(resume.resIdx)">
                  <label> {{ resume.fileName }}</label>
                </div>
              </td>
              <td>
                <button class="copy-button" @click="resumeCopy(resume.resIdx)">복사하기</button>
                <button class="delete-button" @click="resumeDelete(resume.resIdx)">삭제하기</button>
              </td>
              <td>{{ resume.updatedDate }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7">일치하는 검색 결과가 없습니다</td>
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
    }
  });
};

const fileDownload = (idx) => {
  let param = new URLSearchParams();
  param.append("resIdx", idx);

  const postAtion = {
    url: "/api/apply/resumeFileDownload.do",
    method: "POST",
    data: param,
    responseType: "blob",
  };
  axios(postAtion).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const resumeItem = resumeInfoArray.value.resumeList.find((item) => item.resIdx === idx);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", resumeItem.fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

const newResumeCreate = () => {
  router.push({ name: "resume-new" });
};

// 공부용
// const resumeIdxAdd =(resumeidx)=>{
//   router.push({
//     name: "MyResumes",
//     params: { idx: resumeidx },
//   });
// }

const resumeIdxAdd =(resumeidx)=>{
  router.push({
    name: "MyResumes",
    query: { resumeNum: resumeidx },
  });
}

onMounted(() => {
  resumeSearchList();
});
</script>

<style lang="scss" scoped>
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

  button:hover {
    opacity: 0.9;
  }
}
</style>
