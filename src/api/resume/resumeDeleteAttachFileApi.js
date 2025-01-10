import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeDeleteAttachFileApi = async (resIdx) => {
  const param = {
    resIdx: resIdx,
  };
  const result = await axios.post(ResumeAddTable.DeleteAttachFile, param);
  return result.data;
};
