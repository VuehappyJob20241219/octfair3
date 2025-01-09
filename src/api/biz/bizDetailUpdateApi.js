import axios from "axios";
import { Biz } from "../axiosApi/bizApi";

export const bizDetailUpdateApi = async (bizDetailValue) => {
  if (!checkForm(bizDetailValue)) {
    return;
  }

  const param = new URLSearchParams({
    ...bizDetailValue.value,
  });

  return await axios.post(Biz.BizDetailUpdate, param);
};

const checkForm = (bizDetailValue) => {
  let inputBizName = bizDetailValue.value.bizName;
  let inputContact = bizDetailValue.value.bizContact;
  let inputBizFoundDate = bizDetailValue.value.bizFoundDate;

  const currentDate = new Date();
  const bizFoundDate = new Date(inputBizFoundDate);

  const phoneRules = /^\d{2,3}-\d{3,4}-\d{4}$/;

  if (!inputBizName) {
    alert("사업자명을 입력하세요.");
    return false;
  }

  if (!inputContact) {
    //공백인 경우 저장 가능
  } else if (!phoneRules.test(inputContact)) {
    alert("전화번호 형식을 확인해주세요.");
    return false;
  }

  if (bizFoundDate > currentDate) {
    alert("설립일을 미래 날짜로 선택할 수 없습니다.");
    return false;
  }

  return true;
};
