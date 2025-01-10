import axios from "axios";
import { Apply } from "../axiosApi/applyApi";

export const insertApply = async (postIdx,resIdx,loginId) => {
  const request = {
    postIdx: postIdx,
    resumeIdx: resIdx,
    loginId: loginId,

  };
  
  const response = await axios.post(Apply.InsertApply, request);
  return response;  
};
