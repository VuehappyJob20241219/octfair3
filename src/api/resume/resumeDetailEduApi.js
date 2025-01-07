import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeDetailEduApi = async (idx) => {
  const result = await axios.post(ResumeAddTable.ListEducation, { resIdx: idx });
  return result.data;
};
