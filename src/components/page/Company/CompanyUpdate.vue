<template>
  <table>
    <colgroup>
      <col width="10%" />
      <col width="40%" />
      <col width="40%" />
    </colgroup>
    <tbody>
      <tr>
        <th>사업자명</th>
        <td>
          <input type="text" v-model="detailValue.bizName" />
        </td>
        <td rowspan="8" @click="fileDownload">
          <div v-if="imageUrl">
            <img :src="imageUrl" />
          </div>
        </td>
      </tr>
      <tr>
        <th>사업자 대표</th>
        <td>
          <input type="text" v-model="detailValue.bizCeoName" />
        </td>
      </tr>
      <tr>
        <th>연락처</th>
        <td>
          <input type="text" v-model="detailValue.bizContact" @change="companyPhoneNumChange" />
        </td>
      </tr>
      <tr>
        <th>사업자 주소</th>
        <td class="address">
          <input type="text" v-model="detailValue.bizAddr" />
          <b-button variant="outline-success" @click="openDaumPostcode">찾기</b-button>
        </td>
      </tr>
      <tr>
        <th>사원수</th>
        <td>
          <select v-model="detailValue.bizEmpCount">
            <option value="10명 이하">10명 이하</option>
            <option value="50명 이하">50명 이하</option>
            <option value="100명 이하">100명 이하</option>
            <option value="1000명 이하">1000명 이하</option>
            <option value="1000명 이상">1000명 이상</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>홈페이지 주소</th>
        <td>
          <input type="text" v-model="detailValue.bizWebUrl" />
        </td>
      </tr>
      <tr>
        <th>설립일</th>
        <td>
          <input type="date" v-model="detailValue.bizFoundDate" />
        </td>
      </tr>
      <tr>
        <th>매출액</th>
        <td>
          <select v-model="detailValue.bizRevenue">
            <option value="10억 이하">10억 이하</option>
            <option value="100억 이하">100억 이하</option>
            <option value="1000억 이하">1000억 이하</option>
            <option value="1000억 이상">1000억 이상</option>
          </select>
        </td>
      </tr>

      <tr>
        <th>기업소개</th>
        <td colspan="3" style="width: 95%">
          <textarea rows="6" v-model="detailValue.bizIntro"></textarea>
        </td>
      </tr>
      <tr>
        <th>기업로고</th>
        <td colspan="3" class="fileClass">
          <input type="file" style="display: none" id="fileInput" @change="handlerFile" />
          <label class="img-label" htmlFor="fileInput">파일 첨부하기</label>
          <span>{{ fileName ? fileName : detailValue.bizLogo }}</span>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="button-box">
    <b-button variant="primary" @click="detailValue.bizIdx ? handlerUpdateBtn() : handlerInsertBtn()">
      {{ detailValue.bizIdx ? "수정" : "등록" }}
    </b-button>
    <b-button variant="danger" @click="handlerDeleteBtn()">삭제</b-button>
    <b-button variant="secondary" @click="$router.go(-1)">돌아가기</b-button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserInfo } from "../../../stores/userInfo";
import { Company } from "../../../api/axiosApi/companyApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

const userInfo = useUserInfo();
const detailValue = ref({});
const imageUrl = ref();
const fileData = ref("");
const router = useRouter();
const queryClient = useQueryClient();
const fileName = ref();

// 초기 화면 로딩
const searchDetail = async () => {
  const param = { loginId: userInfo.user.loginId };
  try {
    const result = await axios.post(Company.SearchCompanyUpdateDetail, param);
    if (
      result.data.detail.fileExt === "jpg" ||
      result.data.detail.fileExt === "gif" ||
      result.data.detail.fileExt === "png" ||
      result.data.detail.fileExt === "webp"
    ) {
      getFileImage(result.data.detail.bizIdx);
    }

    return result.data;
  } catch (error) {
    return error;
  }
};

const { data: companyDetail, isSuccess } = useQuery({
  queryKey: ["companyDetail"],
  queryFn: searchDetail,
});

watchEffect(() => {
  if (isSuccess.value && companyDetail.value) {
    detailValue.value = toRaw(companyDetail.value.detail) || {};
  }
});

// const apiSuccess = () => {
//   alert("요청하신 작업에 성공하였습니다.");
//   router.go(-1);
//   queryClient.invalidateQueries({
//     queryKey: ["companyList"],
//   });
// };

// 기업 등록
const insertCompanyDetail = async () => {
  const validation = handlerValidation();
  if (!validation) {
    return;
  }

  const textData = {
    ...detailValue.value,
    loginId: userInfo.user.loginId,
  };
  const formData = new FormData();
  if (fileData.value) formData.append("file", fileData.value);
  formData.append("text", new Blob([JSON.stringify(textData)], { type: "application/json" }));
  const res = await axios.post(Company.InsertCompany, formData);
  return res.data;
};

const { mutate: handlerInsertBtn } = useMutation({
  mutationFn: insertCompanyDetail,
  mutationKey: ["companyInsert"],
  onSuccess: (res) => {
    if (res.result === "success") {
      alert("기업이 등록되었습니다.");
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["companyInsert"],
      });
    } else if (res.result === "fail") {
      alert("기업등록에 실패했습니다.");
    }
  },
});

// 기업 수정
const updateCompanyDetail = async () => {
  const validation = handlerValidation();
  if (!validation) {
    return;
  }
  const textData = {
    ...detailValue.value,
    loginId: userInfo.user.loginId,
  };
  const formData = new FormData();
  if (fileData.value) formData.append("file", fileData.value);
  formData.append("text", new Blob([JSON.stringify(textData)], { type: "application/json" }));

  const res = await axios.post(Company.UpdateCompany, formData);
  return res.data;
};

const { mutate: handlerUpdateBtn } = useMutation({
  mutationFn: updateCompanyDetail,
  mutationKey: ["companyUpdate"],
  onSuccess: (res) => {
    if (res.result === "success") {
      alert("기업정보가 수정되었습니다.");
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["companyDetail"],
      });
    } else if (res.result === "fail") {
      alert("기업정보 수정에 실패했습니다.");
    }
  },
});

// 기업 삭제
const deleteCompanyDetail = async () => {
  const res = await axios.post(Company.DeleteCompany, { loginId: userInfo.user.loginId });
  return res.data;
};

const { mutate: handlerDeleteBtn } = useMutation({
  mutationFn: deleteCompanyDetail,
  mutationKey: ["companyDelete"],
  onSuccess: (res) => {
    if (res.result === "success") {
      alert("기업이 삭제되었습니다.");
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["companyDelete"],
      });
    } else if (res.result === "fail") {
      alert("기업삭제에 실패했습니다.");
    }
  },
});

// 이미지 관련
const handlerFile = (e) => {
  const fileInfo = e.target.files;
  const fileInfoSplit = fileInfo[0].name.split(".");
  const fileExtension = fileInfoSplit[1].toLowerCase();
  if (fileExtension === "jpg" || fileExtension === "gif" || fileExtension === "png" || fileExtension === "webp") {
    imageUrl.value = URL.createObjectURL(fileInfo[0]);
  }
  fileData.value = fileInfo[0];
  fileName.value = fileInfo[0].name;
};

const getFileImage = (idx) => {
  let param = new URLSearchParams();
  param.append("bizIdx", idx);
  const postAction = {
    url: Company.DownloadLogo,
    method: "POST",
    data: param,
    responseType: "blob",
  };

  axios(postAction).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    imageUrl.value = url;
  });
};

const fileDownload = () => {
  let param = new URLSearchParams();
  param.append("bizIdx", detailValue.value.bizIdx);
  const postAction = {
    url: Company.DownloadLogo,
    method: "POST",
    data: param,
    responseType: "blob",
  };
  axios(postAction).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", detailValue.value.bizLogo);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

// 주소API
const openDaumPostcode = () => {
  new daum.Postcode({
    oncomplete: (data) => {
      detailValue.value.bizAddr = data.roadAddress;
    },
  }).open();
};

// 등록,수정 유효성 검사
const handlerValidation = () => {
  const today = new Date();
  const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
  const inputs = detailValue.value;

  if (!inputs.bizName) {
    alert("사업자명을 입력해 주세요.");
    return;
  } else if (!inputs.bizCeoName) {
    alert("사업자 대표를 입력해 주세요.");
    return;
  } else if (!inputs.bizContact) {
    alert("연락처를 입력해 주세요.");
    return;
  } else if (!inputs.bizAddr) {
    alert("사업자 주소를 입력해 주세요.");
    return;
  } else if (!inputs.bizEmpCount) {
    alert("사원수를 선택해 주세요.");
    return;
  } else if (!inputs.bizWebUrl) {
    alert("홈페이지 주소를 입력해 주세요.");
    return;
  } else if (!inputs.bizFoundDate) {
    alert("설립일을 입력해 주세요.");
    return;
  } else if (!inputs.bizRevenue) {
    alert("매출액을 입력해 주세요.");
    return;
  } else if (!inputs.bizIntro) {
    alert("기업소개를 입력해 주세요.");
    return;
    // } else if (!inputs.fileData) {
    //   alert('로고를 등록해 주세요.');
    //   return;
  }

  if (today < new Date(inputs.bizFoundDate)) {
    alert("설립일은 오늘보다 이전이어야 합니다.");
    return;
  }

  if (!urlPattern.test(inputs.bizWebUrl)) {
    alert("홈페이지 주소는 올바른 URL 형식으로 입력해 주세요.");
    return;
  }

  return true;
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border: black;
  margin: 20px 0px 0px 0px;
  font-size: 13px;
  text-align: left;

  th {
    text-align: center;
    background-color: #ccc;
  }

  td {
    border-bottom: 1px solid #ddd;
    text-align: left;
    height: 50px;
    text-align: center;
  }
}
input,
select,
textarea {
  width: 98%;
  height: 95%;
  border: none;
  vertical-align: middle;
}

div .button-box {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
}

button {
  margin: 4px 4px;
}

img {
  width: 300px;
  height: 300px;
}

.img-label {
  margin-right: 5px;
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

.address {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  input {
    width: 70%;
    margin-right: 10px;
  }
}

.fileClass {
  padding-left: 10px;
  text-align: inline-block;
  text-align: left;
}
</style>
