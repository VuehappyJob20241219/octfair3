import axios from "axios";
import { Login } from "../axiosApi/loginApi";

export const findMyIdApi = async (findId) => {
  let inputName = findId.value.inputName;
  let inputEmail = findId.value.inputEmail;

  if (!inputName) {
    alert("이름을 입력하세요.");
    return false;
  }

  if (!inputEmail) {
    alert("이메일을 입력하세요.");
    return false;
  }

  const param = new URLSearchParams({
    name: inputName,
    email: inputEmail,
  });

  const result = await axios.post(Login.findId, param);

  return result.data;
};
