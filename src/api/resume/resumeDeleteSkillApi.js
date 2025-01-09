import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeDeleteSkillApi = async (resIdx, skillIdx) => {
  const param = {
    resIdx: resIdx,
    skillIdx: skillIdx,
  };
  const result = await axios.post(ResumeAddTable.DeleteSkill, param);
  return result.data;
};
