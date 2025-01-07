import axios from "axios";
import { Resume } from "../axiosApi/resumeApi";

export const resumeMainDetailApi = async (param) => {
  const result = await axios.post(Resume.MainResumeDetail, param);
  return result.data.result;
};
