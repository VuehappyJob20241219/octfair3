import axios from "axios";
import { Join } from "../axiosApi/joinApi";

export const joinUserApi = async (checkId, register) => {
  if (!checkForm(register)) {
    return;
  }

  if (!checkId.value) {
    alert("ID 중복 확인을 해주세요.");
    return false;
  }

  const param = new URLSearchParams({
    ...register.value,
    action: "I", //필요없지만 BE와 맞추려고 사용
    ckIdcheckreg: "1", //필요없지만 BE와 맞추려고 사용
    ckEmailcheckreg: "0", //필요없지만 BE와 맞추려고 사용
    statusYn: 1,
  });

  const result = await axios.post(Join.join, param);

  return result.data;
};

const checkForm = (register) => {
  let inputUserType = register.value.userType;
  let inputId = register.value.loginId;
  let inputPwd = register.value.password;
  let inputPwdOk = register.value.password1;

  let inputName = register.value.name;
  let inputSex = register.value.sex;
  let inputBirthday = register.value.birthday;
  let inputPhone = register.value.phone;
  let inputEmail = register.value.email;
  let inputZipCode = register.value.zipCode;

  const currentDate = new Date();
  const Birthday = new Date(inputBirthday);

  const passwordRules =
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const emailRules =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const phoneRules = /^\d{2,3}-\d{3,4}-\d{4}$/;

  if (!inputUserType) {
    alert("회원 유형을 선택해주세요.");
    return false;
  }
  if (!inputId) {
    alert("아이디를 입력해주세요.");
    return false;
  }
  if (!passwordRules.test(inputPwd)) {
    alert(
      "비밀 번호는 숫자,영문자,특수문자 조합으로 8~15자리를 사용해야 합니다."
    );
    return false;
  }
  if (!inputPwdOk) {
    alert("비밀번호 확인란을 입력해주세요.");
    return false;
  }
  if (!(inputPwd === inputPwdOk)) {
    alert("비밀번호와 확인용 비밀번호가 일치하지 않습니다.");
    return false;
  }
  if (!inputName || inputName < 1) {
    alert("이름을 입력하세요.");
    return false;
  }
  if (!inputSex) {
    alert("성별을 선택해주세요.");
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
  if (!inputPhone) {
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

  return true;
};
