import axios from "axios";
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
  let newPasswd = inputPw.value.newPasswd;
  let newPasswdConfirm = inputPw.value.newPasswdConfirm;
  const passwordRules =
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  if (!newPasswd) {
    alert("새 비밀번호를 입력해 주세요.");
    return false;
  }

  if (!passwordRules.test(newPasswd)) {
    alert(
      "비밀 번호는 숫자,영문자,특수문자 조합으로 8~15자리를 사용해야 합니다."
    );
    return false;
  }

  if (!newPasswdConfirm) {
    alert("새 비밀번호 확인를 입력해 주세요.");
    return false;
  }

  return true;
};
