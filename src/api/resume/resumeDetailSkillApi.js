import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeDetailSkillApi = async (idx) => {
  const result = await axios.post(ResumeAddTable.ListSkill, { resIdx: idx });
  return result.data;
};
