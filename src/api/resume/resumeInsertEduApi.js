import axios from "axios";
import { nullCheck } from "../../common/nullCheck";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeInsertEduApi = async (resIdx, educationInfo) => {
  if (educationInfo.value.eduLevel === "none") {
    alert("교육 단계를 선택해주세요.");
    return;
  }

  if (educationInfo.value.grdStatus === "none") {
    alert("학적 상태를 선택해주세요.");
    return;
  }

  const isNull = nullCheck([
    { inval: educationInfo.value.eduLevel, msg: "교육단계를 선택해주세요." },
    { inval: educationInfo.value.schoolName, msg: "학교이름을 입력해주세요." },
    { inval: educationInfo.value.major, msg: "전공을 입력해주세요." },
    { inval: educationInfo.value.admDate, msg: "입학일을 입력해주세요." },
    { inval: educationInfo.value.grdDate, msg: "졸업일을 입력해주세요.." },
    { inval: educationInfo.value.grdStatus, msg: "학적 상태를 선택해주세요." },
  ]);
  if (!isNull) return;

  if (educationInfo.value.admDate > educationInfo.value.grdDate) {
    alert("입학일과 졸업일을 확인해주세요");
    return;
  }

  const text = {
    resIdx: resIdx.value.resIdx,
    eduLevel: educationInfo.value.eduLevel,
    schoolName: educationInfo.value.schoolName,
    major: educationInfo.value.major,
    admDate: educationInfo.value.admDate,
    grdDate: educationInfo.value.grdDate,
    grdStatus: educationInfo.value.grdStatus,
  };
  await axios.post(ResumeAddTable.InsertEducation, text);
};
