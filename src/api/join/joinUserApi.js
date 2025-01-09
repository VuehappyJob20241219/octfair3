import axios from "axios";
import { checkInputNull } from "../../common/checkInput";
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
  const inputFields = {
    inputUserType: register.value.userType,
    inputLoginId: register.value.loginId,
    inputPassword: register.value.password,
    inputPasswordOk: register.value.password1,
    inputName: register.value.name,
    inputSex: register.value.sex,
    inputBirthday: register.value.birthday,
    inputPhone: register.value.phone,
    inputEmail: register.value.email,
    inputZipCode: register.value.zipCode,
  };

  if (!checkInputNull(inputFields)) {
    return false;
  }

  if (!(inputFields.inputPassword === inputFields.inputPasswordOk)) {
    alert("비밀번호와 확인용 비밀번호가 일치하지 않습니다.");
    return false;
  }

  return true;
};
