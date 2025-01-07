import axios from "axios";
import { Login } from "../axiosApi/loginApi";

export const findInfoPwApi = async (findInfoPw) => {
  let inputId = findInfoPw.value.regiId;
  let inputEmail = findInfoPw.value.emailPwd;

  if (!inputId) {
    alert("아이디을 입력하세요.");
    return false;
  }

  if (!inputEmail) {
    alert("이메일을 입력하세요.");
    return false;
  }

  const param = new URLSearchParams({
    id: inputId,
    email: inputEmail,
  });

  const result = await axios.post(Login.findInfoPw, param);
  return result.data;
};
