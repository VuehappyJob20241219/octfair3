import axios from "axios";
import { Applicant } from "../axiosApi/applicantApi";

export const applicantDetailUpdateApi = async (applicantDetailValue) => {
  if (!checkForm(applicantDetailValue)) {
    return;
  }

  const param = new URLSearchParams({
    ...applicantDetailValue.value,
  });

  return await axios.post(Applicant.ApplicantDetailUpdate, param);
};

const checkForm = (applicantDetailValue) => {
  let inputName = applicantDetailValue.value.name;
  let inputBirthday = applicantDetailValue.value.birthday;
  let inputPhone = applicantDetailValue.value.phone;
  let inputEmail = applicantDetailValue.value.email;
  let inputRegDate = applicantDetailValue.value.regdate;
  let inputZipCode = applicantDetailValue.value.zipCode;

  const currentDate = new Date();
  const Birthday = new Date(inputBirthday);
  const RegDate = new Date(inputRegDate);

  const emailRules =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const phoneRules = /^\d{2,3}-\d{3,4}-\d{4}$/;
  const ZipCodeRules = /[0-9\-]{5}/;

  if (!inputName) {
    alert("이름을 입력하세요.");
    return false;
  }
  if (!inputBirthday) {
    alert("생일을 입력해주세요.");
    return false;
  }
  if (Birthday > currentDate) {
    alert("생일을 미래 날짜로 선택할 수 없습니다.");
    return false;
  }
  if (!inputPhone) {
    alert("전화번호를 입력해주세요.");
    return false;
  }
  if (!phoneRules.test(inputPhone)) {
    alert("전화번호 형식을 확인해주세요.");
    return false;
  }
  if (!inputEmail) {
    alert("이메일을 입력해주세요.");
    return false;
  }
  if (!emailRules.test(inputEmail)) {
    alert("이메일 형식을 확인해주세요.");
    return false;
  }
  if (!inputRegDate) {
    alert("가입일자를 입력해주세요.");
    return false;
  }
  if (RegDate > currentDate) {
    alert("가입일자를 미래 날짜로 선택할 수 없습니다.");
    return false;
  }
  if (!inputZipCode) {
    alert("우편번호를 입력해주세요.");
    return false;
  }
  if (!ZipCodeRules.test(inputZipCode)) {
    alert("우편번호를 확인해주세요.");
    return false;
  }
  return true;
};
