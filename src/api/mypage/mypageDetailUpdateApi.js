import axios from "axios";
import { checkInput } from "../../common/checkInput";
import { mypage } from "../axiosApi/mypageApi";

export const mypageDetailUpdateApi = async (userDetailValue) => {
  if (!checkForm(userDetailValue)) {
    return;
  }

  const param = new URLSearchParams({
    ...userDetailValue.value,
  });

  return await axios.post(mypage.userDetailUpdate, param);
};

const checkForm = (userDetailValue) => {
  const inputFields = {
    inputName: userDetailValue.value.name,
    inputBirthday: userDetailValue.value.birthday,
    inputPhone: userDetailValue.value.phone,
    inputEmail: userDetailValue.value.email,
    inputZipCode: userDetailValue.value.zipCode,
  };

  if (!checkInput(inputFields)) {
    return false;
  }

  return true;
};
