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

  if (inputFields.inputOldPassword === inputFields.inputNewPassword) {
    alert("새 비밀번호는 현재 비밀번호와 다르게 설정해야 합니다.");
    return false;
  }

  if (!(inputFields.inputNewPassword === inputFields.inputNewPasswordOk)) {
    alert(
      "새 비밀번호와 확인용 비밀번호가 일치하지 않습니다. 다시 입력해주세요."
    );
    return false;
  }

  return true;
};
