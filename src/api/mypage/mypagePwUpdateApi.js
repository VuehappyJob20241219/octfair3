import axios from "axios";
import { checkInput, checkPasswordRule } from "../../common/checkInput";
import { mypage } from "../axiosApi/mypageApi";

export const mypagePwUpdateApi = async (userInfo, inputPw) => {
  if (!checkForm(inputPw)) {
    return;
  }

  const param = new URLSearchParams({
    loginId: userInfo.user.loginId,
    passwd: inputPw.value.passwd,
    newPasswd: inputPw.value.newPasswd,
    newPasswdConfirm: inputPw.value.newPasswdConfirm,
  });

  const result = await axios.post(mypage.userPwUpdate, param);

  return result.data;
};

const checkForm = (inputPw) => {
  const inputFields = {
    inputOldPassword: inputPw.value.passwd,
    inputNewPassword: inputPw.value.newPasswd,
    inputNewPasswordOk: inputPw.value.newPasswdConfirm,
  };

  if (!checkInput(inputFields)) {
    return false;
  }

  if (!checkPasswordRule(inputFields.inputNewPassword)) {
    return false;
  }

  return true;
};
