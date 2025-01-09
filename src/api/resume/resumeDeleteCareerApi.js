import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeDeleteCareerApi = async (resIdx, crrIdx) => {
  const param = {
    resIdx: resIdx,
    crrIdx: crrIdx,
  };
  const result = await axios.post(ResumeAddTable.DeleteCareer, param);
  return result.data;
};
