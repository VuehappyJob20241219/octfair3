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
          <input type="text" v-model="companyDetail.bizName" />
        </td>
        <td rowspan="8" @click="fileDownload">
          <img :src="imageUrl" />
        </td>
      </tr>
      <tr>
        <th>사업자 대표</th>
        <td>
          <input type="text" v-model="companyDetail.bizCeoName" />
        </td>
      </tr>
      <tr>
        <th>연락처</th>
        <td>
          <input type="text" v-model="companyDetail.bizContact" @change="companyPhoneNumChange" />
        </td>
      </tr>
      <tr>
        <th>사업자 주소</th>
        <td class="address">
          <input type="text" v-model="companyDetail.bizAddr" />
          <b-button variant="outline-success" @click="openDaumPostcode">찾기</b-button>
        </td>
      </tr>
      <tr>
        <th>사원수</th>
        <td>
          <select v-model="companyDetail.bizEmpCount">
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
          <input type="text" v-model="companyDetail.bizWebUrl" />
        </td>
      </tr>
      <tr>
        <th>설립일</th>
        <td>
          <input type="date" v-model="companyDetail.bizFoundDate" />
        </td>
      </tr>
      <tr>
        <th>매출액</th>
        <td>
          <select v-model="companyDetail.bizRevenue">
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
          <textarea rows="6" v-model="companyDetail.bizIntro"></textarea>
        </td>
      </tr>
      <tr>
        <th>기업로고</th>
        <td colspan="3">
          <input type="file" id="fileInput" @change="handlerFile" />
        </td>
      </tr>
    </tbody>
  </table>
  <div class="button-box">
    <b-button variant="primary" @click="companyDetail.bizIdx ? handlerCompanyUpdate() : handlerCompanyInsert()">
      {{ companyDetail.bizIdx ? "수정" : "등록" }}
    </b-button>
    <b-button variant="danger" @click="handlerCompanyDelete()">삭제</b-button>
    <b-button variant="secondary" @click="$router.go(-1)">돌아가기</b-button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserInfo } from "../../../stores/userInfo";
import { Company } from "../../../api/axiosApi/companyApi";

const userInfo = useUserInfo();
const companyDetail = ref({});
const imageUrl = ref("");
const fileData = ref("");
const router = useRouter();

const searchDetail = () => {
  axios
    .post(Company.SearchCompanyUpdateDetail, {
      loginId: userInfo.user.loginId,
    })
    .then((res) => {
      companyDetail.value = res.data.detail || {};
      if (
        companyDetail.value.fileExt === "jpg" ||
        companyDetail.value.fileExt === "gif" ||
        companyDetail.value.fileExt === "png" ||
        companyDetail.value.fileExt === "webp"
      ) {
        getFileImage(companyDetail.value.bizIdx);
      }
    });
};

const handlerCompanyInsert = async () => {
  const textData = {
    ...companyDetail.value,
    loginId: userInfo.user.loginId,
  };
  const formData = new FormData();
  if (fileData.value) formData.append("file", fileData.value);
  formData.append("text", new Blob([JSON.stringify(textData)], { type: "application/json" }));

  await axios.post(Company.InsertCompany, formData).then((res) => {
    if (res.data.result === "success") {
      alert("기업이 등록되었습니다.");
      router.go(-1);
    } else {
      alert("기업등록이 실패하였습니다.");
    }
  });
};

const handlerCompanyUpdate = async () => {
  const validation = handlerValidation();
  if (!validation) {
    return;
  }

  const textData = {
    ...companyDetail.value,
    loginId: userInfo.user.loginId,
  };
  const formData = new FormData();
  if (fileData.value) formData.append("file", fileData.value);
  formData.append("text", new Blob([JSON.stringify(textData)], { type: "application/json" }));

  await axios.post(Company.UpdateCompany, formData).then((res) => {
    if (res.data.result === "success") {
      alert("기업정보가 수정되었습니다.");
      router.push({
        path: "/vue/mypage/update.do",
      });
    } else {
      alert("기업정보 수정이 실패하였습니다.");
    }
  });
};

const handlerFile = (e) => {
  const fileInfo = e.target.files;
  const fileInfoSplit = fileInfo[0].name.split(".");
  const fileExtension = fileInfoSplit[1].toLowerCase();
  if (fileExtension === "jpg" || fileExtension === "gif" || fileExtension === "png") {
    imageUrl.value = URL.createObjectURL(fileInfo[0]);
  }
  fileData.value = fileInfo[0];
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

const companyPhoneNumChange = (e) => {
  let inputNum = e.target.value;
  console.log("inputNum====>  " + inputNum);
  let phone = inputNum.replace(/[^0-9]/g, "");

  if (phone.length >= 3) {
    var prefix = phone.substring(0, 3);
    if (["010", "011", "016", "017", "019"].indexOf(prefix) === -1) {
      alert("정확한 전화번호를 입력해주세요.");
      return;
    }
  }
  if (phone.length > 3 && phone.length <= 7) {
    phone = phone.replace(/(\d{3})(\d{1,4})/, "$1-$2");
  } else if (phone.length >= 8) {
    phone = phone.replace(/(\d{3})(\d{3,4})(\d{0,4})/, "$1-$2-$3");
  }
  if (phone.length > 13) {
    phone = phone.substring(0, 13);
  }
  return phone;
};

const openDaumPostcode = () => {
  new daum.Postcode({
    oncomplete: (data) => {
      companyDetail.value.bizAddr = data.roadAddress;
    },
  }).open();
};

const handlerValidation = () => {
  const today = new Date();
  const addressPattern = /^[\w\s가-힣]+$/;
  const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;

  const inputs = companyDetail.value;

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
    return false;
  }

  if (!addressPattern.test(inputs.bizAddr)) {
    alert("주소는 특수 문자를 포함하지 않는 형식으로 입력해 주세요.");
    return false;
  }

  if (!urlPattern.test(inputs.bizWebUrl)) {
    alert("홈페이지 주소는 올바른 URL 형식으로 입력해 주세요.");
    return false;
  }

  return true;
};

const fileDownload = () => {
  let param = new URLSearchParams();
  param.append("bizIdx", companyDetail.value.bizIdx);
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
    link.setAttribute("download", companyDetail.value.bizLogo);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

const handlerCompanyDelete = async () => {
  await axios.post(Company.DeleteCompany, { loginId: userInfo.user.loginId }).then((res) => {
    if (res.data.result === "success") {
      alert("기업이 삭제되었습니다.");
      router.go(-1);
    } else {
      alert("기업삭제가 실패하였습니다.");
    }
  });
};

onMounted(() => {
  searchDetail();
});
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

.button-box {
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
</style>
