import axios from "axios";
import { Company } from "../axiosApi/companyApi";

export const companyInsertApi = async (loginId, detailValue, fileData, imageUrl, fileName) => {
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
    } else if (!imageUrl.value && !fileName.value) {
      alert("기업로고를 등록해 주세요.");
      return;
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

  const validation = handlerValidation();
  if (!validation) {
    return;
  } else {
    const textData = {
      ...detailValue.value,
      loginId: loginId,
    };
    const formData = new FormData();
    if (fileData.value) formData.append("file", fileData.value);
    formData.append("text", new Blob([JSON.stringify(textData)], { type: "application/json" }));
    const res = await axios.post(Company.InsertCompany, formData);
    return res.data;
  }
};
