import axios from "axios";
import { checkInput } from "../../common/checkInput";
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
  const inputFields = {
    inputNewPassword: setPw.value.newPasswd,
    inputPasswordOk: setPw.value.newPasswdConfirm,
  };

  if (!checkInput(inputFields)) {
    return false;
  }

  if (!(inputFields.inputNewPassword === inputFields.inputPasswordOk)) {
    alert(
      "새 비밀번호와 확인용 비밀번호가 일치하지 않습니다. 다시 입력해주세요."
    );
    return false;
  }

  return true;
};
