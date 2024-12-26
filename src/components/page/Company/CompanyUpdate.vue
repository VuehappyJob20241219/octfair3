<template>
  <table>
    <colgroup>
      <col width="12%" />
      <col width="38%" />
      <col width="12%" />
      <col width="38%" />
    </colgroup>
    <tbody>
      <tr>
        <th>사업자명</th>
        <td>
          <input type="text" v-model="companyDetail.bizName" />
        </td>
        <th>사업자 대표</th>
        <td>
          <input type="text" v-model="companyDetail.bizCeoName" />
        </td>
      </tr>
      <tr>
        <th>연락처</th>
        <td>
          <input type="text" v-model="companyDetail.bizContact" />
        </td>
        <th>사업자 주소</th>
        <td>
          <input type="text" v-model="companyDetail.bizAddr" />
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
          <textarea rows="10" v-model="companyDetail.bizIntro"></textarea>
        </td>
      </tr>
      <tr>
        <th>기업로고</th>
        <td colspan="3">
          <input type="file" id="fileInput" @change="handlerFile" />
        </td>
      </tr>
      <tr>
        <th>미리보기</th>
        <td colspan="3" @click="fileDownload">
          <img :src="imageUrl" />
        </td>
      </tr>
    </tbody>
  </table>
  <div class="button-box">
    <button @click="companyDetail.bizIdx ? handlerCompanyUpdate() : handlerCompanyInsert()">
      {{ companyDetail.bizIdx ? "수정" : "등록" }}
    </button>
    <button @click="handlerCompanyDelete()">삭제</button>
    <button @click="$router.go(-1)">돌아가기</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { useUserInfo } from "../../../stores/userInfo";
import { useRouter } from "vue-router";

const userInfo = useUserInfo();
const companyDetail = ref({});
const imageUrl = ref("");
const phoneNum = ref("");
const fileData = ref("");
const router = useRouter();

const apiSuccess = () => {
  router.go(-1);
};

const searchDetail = () => {
  axios.post("/api/company/companyUpdatePageRe.do", { loginId: userInfo.user.loginId }).then((res) => {
    companyDetail.value = res.data.detail || {};
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

  await axios.post("/api/company/companySaveBody.do", formData).then((res) => {
    if (res.data.result === "success") {
      alert("회사가 등록되었습니다.");
    } else {
      alert("공부하세요!");
    }
  });
};

const handlerCompanyUpdate = async () => {
  const textData = {
    ...companyDetail.value,
    loginId: userInfo.user.loginId,
  };
  const formData = new FormData();
  if (fileData.value) formData.append("file", fileData.value);
  formData.append("text", new Blob([JSON.stringify(textData)], { type: "application/json" }));

  await axios.post("/api/company/companyUpdateBody.do", formData).then((res) => {
    if (res.data.result === "success") {
      alert("회사가 수정되었습니다.");
    } else {
      alert("공부하세요!");
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

// const getFileImage = () => {
//   let param = new URLSearchParams();
//   param.append('bizIdx', props.idx);
//   const postAction = {
//     url: '',
//     method: 'POST',
//     data: param,
//     responseType: 'blob',
//   };
// };

const companyPhoneNumChange = (e) => {
  const inputNum = e.target.value;
  var phone = inputNum.replace(/[^0-9]/g, "");

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
  phoneNum.value = phone;
};

// const handlerValidation = () => {
//   const today = new Date();
//   const addressPattern = /^[\w\s가-힣]+$/;
//   const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/?%&=.#]*)?$/;

//   const inputs = companyDetail.value;
//   console.log("companyDetail: " + inputs);

//   if (!inputs.bizName) {
//     alert("사업자 이름을 입력해 주세요.");
//     return;
//   } else if (!inputs.bizCeoName) {
//     alert("사업자 이름을 입력해 주세요.");
//     return;
//   } else if (!inputs.bizContact) {
//     alert("연락처를 입력해 주세요.");
//     return;
//   } else if (!inputs.bizAddr) {
//     alert("주소를 입력해 주세요.");
//     return;
//   } else if (!inputs.bizFoundDate) {
//     alert("설립일을 입력해 주세요.");
//     return;
//   } else if (!inputs.bizWebUrl) {
//     alert("홈페이지 주소를 입력해 주세요.");
//     return;
//   } else if (!inputs.bizEmpCount) {
//     alert("사원수를 입력해 주세요.");
//     return;
//   } else if (!inputs.bizRevenue) {
//     alert("매출액을 입력해 주세요.");
//     return;
//     // } else if (!inputs.fileData) {
//     //   alert('로고를 등록해 주세요.');
//     //   return;
//   }

//   if (today < new Date(inputs.bizFoundDate)) {
//     alert("설립일은 오늘보다 이전이어야 합니다.");
//     return false;
//   }

//   if (!addressPattern.test(inputs.bizAddr)) {
//     alert("주소는 특수 문자를 포함하지 않는 형식으로 입력해 주세요.");
//     return false;
//   }

//   if (!urlPattern.test(inputs.bizWebUrl)) {
//     alert("홈페이지 주소는 올바른 URL 형식으로 입력해 주세요.");
//     return false;
//   }

//   return inputs;
// };

const fileDownload = () => {
  let param = new URLSearchParams();
  param.append("bizIdx", props.idx);
  const postAction = {
    url: "api/",
    method: "POST",
    data: param,
    responseType: "blob",
  };
  axios(postAction).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", companyDetail.value.fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

const handlerCompanyDelete = async () => {
  await axios.post("/api/company/companyDeleteRe.do", { loginId: userInfo.user.loginId }).then((res) => {
    if (res.data.result === "success") {
      alert("회사가 삭제되었습니다.");
      router.go(-1);
    } else {
      alert("공부하세요!");
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
  margin: 20px 0px 0px 0px;
  font-size: 13px;
  text-align: left;

  th {
    text-align: center;
    background-color: #ccc;
    color: black;
  }

  td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    height: 30px;
  }
}
input,
select,
textarea {
  width: 95%;
  height: 90%;
}

.button-box {
  text-align: center;
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

img {
  width: 100px;
  height: 100px;
}
</style>
