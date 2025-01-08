import axios from "axios";
import { mypage } from "../axiosApi/mypageApi";

export const mypageDetailApi = async (userInfo) => {
  const param = new URLSearchParams({
    loginId: userInfo.user.loginId,
  });

  const result = await axios.post(mypage.userDetail, param);

  return result.data;
};
