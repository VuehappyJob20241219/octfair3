import axios from "axios";
import { mypage } from "../axiosApi/mypageApi";

export const mypageDetailUpdateApi = async (userDetailValue) => {
  if (!checkForm(userDetailValue)) {
    return;
  }

  const param = new URLSearchParams({
    ...userDetailValue.value,
  });

  return await axios.post(mypage.userDetailUpdate, param);
};

const checkForm = (userDetailValue) => {
  let inputName = userDetailValue.value.name;
  let inputBirthday = userDetailValue.value.birthday;
  let inputPhone = userDetailValue.value.phone;
  let inputEmail = userDetailValue.value.email;
  let inputZipCode = userDetailValue.value.zipCode;

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
  if (!inputZipCode) {
    alert("우편번호(주소)를 입력해주세요.");
    return false;
  }
  if (!ZipCodeRules.test(inputZipCode)) {
    alert("우편번호를 확인해주세요.");
    return false;
  }
  return true;
};
