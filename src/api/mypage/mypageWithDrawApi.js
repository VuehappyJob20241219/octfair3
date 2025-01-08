import axios from "axios";
import { mypage } from "../axiosApi/mypageApi";

export const mypageWithDrawApi = async (pw) => {
  const param = new URLSearchParams({
    password: pw.value.password,
  });

  const result = await axios.post(mypage.withDraw, param);

  return result.data;
};
