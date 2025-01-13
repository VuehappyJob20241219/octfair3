import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeInsertSkillApi = async (resIdx, skillInfo) => {
  if (!skillInfo.value.skillName) {
    alert("기술이름 또는 능력명을 입력해주세요");
    return;
  }

  if (!skillInfo.value.skillDetail) {
    alert("기술 또는 능력을 상세하게 기재해주세요");
    return;
  }
  const text = {
    resIdx: resIdx.value.resIdx,
    skillName: skillInfo.value.skillName,
    skillDetail: skillInfo.value.skillDetail,
  };
  const result = await axios.post(ResumeAddTable.InsertSkill, text);
  return result.data;
};
