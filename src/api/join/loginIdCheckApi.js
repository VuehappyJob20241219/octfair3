import axios from "axios";
import { Join } from "../axiosApi/joinApi";

export const loginIdCheckApi = async (register) => {
  let inputId = register.value.loginId;
  const param = new URLSearchParams({
    loginId: inputId,
  });

  const result = await axios.post(Join.loginIdCheck, param);
  return result.data;
};
