import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeDetailCareerApi = async (idx) => {
  const result = await axios.post(ResumeAddTable.ListCareer, { resIdx: idx });
  return result.data;
};
