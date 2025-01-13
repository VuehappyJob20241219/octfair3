import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeInsertCertApi = async (resIdx, certificationInfo) => {
  const validation = [
    { key: "certName", message: "자격증명을 입력해주세요" },
    { key: "grade", message: "등급을 상세하게 입력해주세요" },
    { key: "issuer", message: "발행처를 입력해주세요" },
    { key: "acqDate", message: "취득일을 입력해주세요" },
  ];
  for (const rule of validation) {
    if (!certificationInfo.value[rule.key]) {
      alert(rule.message);
      return;
    }
  }
  const text = {
    resIdx: resIdx.value.resIdx,
    certName: certificationInfo.value.certName,
    grade: certificationInfo.value.grade,
    issuer: certificationInfo.value.issuer,
    acqDate: certificationInfo.value.acqDate,
  };
  const result = await axios.post(ResumeAddTable.InsertCertification, text);
  return result.data;
};
