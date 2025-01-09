import axios from "axios";
import { checkInput } from "../../common/checkInput";
import { Login } from "../axiosApi/loginApi";

export const findMyIdApi = async (findId) => {
  const inputFields = {
    inputName: findId.value.inputName,
    inputEmail: findId.value.inputEmail,
  };

  if (!checkInput(inputFields, false)) {
    return false;
  }

  const param = new URLSearchParams({
    name: inputFields.inputName,
    email: inputFields.inputEmail,
  });

  const result = await axios.post(Login.findId, param);

  return result.data;
};
