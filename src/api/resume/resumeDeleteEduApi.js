import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeDeleteEduApi = async (resIdx, eduIdx) => {
  const param = {
    resIdx: resIdx,
    eduIdx: eduIdx,
  };
  const result = await axios.post(ResumeAddTable.DeleteEducation, param);
  return result.data;
};
