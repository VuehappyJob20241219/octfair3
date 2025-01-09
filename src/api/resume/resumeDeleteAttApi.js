import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeDeleteAttApi = async (resIdx, attIdx) => {
  const param = {
    resIdx: resIdx,
    attIdx: attIdx,
  };
  const result = await axios.post(ResumeAddTable.DeleteAttachment, param);
  return result.data;
};
