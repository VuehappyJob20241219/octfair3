import axios from "axios";
import { checkInput } from "../../common/checkInput";
import { Login } from "../axiosApi/loginApi";

export const findInfoPwApi = async (findInfoPw) => {
  const inputFields = {
    inputLoginId: findInfoPw.value.regiId,
    inputEmail: findInfoPw.value.emailPwd,
  };

  if (!checkInput(inputFields, false)) {
    return false;
  }

  const param = new URLSearchParams({
    id: inputFields.inputLoginId,
    email: inputFields.inputEmail,
  });

  const result = await axios.post(Login.findInfoPw, param);
  return result.data;
};
