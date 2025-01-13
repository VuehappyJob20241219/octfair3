import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeInsertCareerApi = async (resIdx, careerInfo) => {
  const validation = [
    { key: "company", message: "회사명을 입력하세요.", group: "career" },
    { key: "start_date", message: "입사일을 입력하세요.", group: "career" },
    { key: "end_date", message: "퇴사일을 입력하세요.", group: "career" },
    { key: "dept", message: "근무부서를 입력하세요.", group: "career" },
    { key: "position", message: "직책/직급을 입력하세요.", group: "career" },
    { key: "reason", message: "퇴사사유를 입력하세요.", group: "career" },
    { key: "crr_desc", message: "담당업무를 입력하세요.", group: "career" },
  ];

  for (const rule of validation) {
    if (!careerInfo.value[rule.key]) {
      alert(rule.message);
      return;
    }
  }

  if (careerInfo.value.start_date > careerInfo.value.end_date) {
    alert("입사일과 퇴사일을 확인해주세요");
    return;
  }
  const text = {
    resIdx: resIdx.value.resIdx,
    company: careerInfo.value.company,
    startDate: careerInfo.value.start_date,
    endDate: careerInfo.value.end_date,
    dept: careerInfo.value.dept,
    position: careerInfo.value.position,
    reason: careerInfo.value.reason,
    crrDesc: careerInfo.value.crr_desc,
  };
  const result = await axios.post(ResumeAddTable.InsertCareer, text);
  return result.data;
};
