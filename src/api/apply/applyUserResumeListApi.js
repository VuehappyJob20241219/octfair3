import axios from "axios";
import { Apply } from "../axiosApi/applyApi";

export const applyUserResumeListApi = async (loginId) => {
  const param = {
    loginId: loginId,
  };
  const result = await axios.post(Apply.ApplyUserResumeList, param);
  return result.data;
    
};
