import axios from "axios";
import { Login } from "../axiosApi/loginApi";

export const setMyPwApi = async (setPw) => {
  if (!checkForm(setPw)) {
    return;
  }

  const param = new URLSearchParams({
    id: setPw.value.id,
    pw: setPw.value.newPasswd,
  });

  const result = await axios.post(Login.setPw, param);
  return result.data;
};

const checkForm = (setPw) => {
  let inputPw = setPw.value.newPasswd;
  let inputPwOk = setPw.value.newPasswdConfirm;

  const passwordRules =
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  if (!inputPw) {
    alert("비밀번호를 입력하세요.");
    return false;
  }

  if (!passwordRules.test(inputPw)) {
    alert(
      "비밀 번호는 숫자,영문자,특수문자 조합으로 8~15자리를 사용해야 합니다."
    );
    return false;
  }

  if (!inputPwOk) {
    alert("비밀번호 확인란을 입력하세요.");
    return false;
  }

  if (!(inputPw === inputPwOk)) {
    alert(
      "새 비밀번호와 확인용 비밀번호가 일치하지 않습니다. 다시 입력해주세요."
    );
    return false;
  }

  return true;
};
