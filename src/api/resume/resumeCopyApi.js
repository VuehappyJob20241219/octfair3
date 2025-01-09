import axios from "axios";
import { Resume } from "../axiosApi/resumeApi";

export const resumeCopyApi = async (idx) => {
  const param = {
    resIdx: idx,
  };
  const result = await axios.post(Resume.CopyResume, param);
  console.log("이력서 복사:", result); // 확인 로그 추가
  return result.data;
};
