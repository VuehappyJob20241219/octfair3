import axios from "axios";
import { Resume } from "../axiosApi/resumeApi";

export const resumeUpdateInfoApi = async (idx) => {
  const result = await axios.post(Resume.MyResume, { resIdx: idx });
  return result.data.result;
};
