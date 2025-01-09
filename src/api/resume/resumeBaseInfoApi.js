import axios from "axios";
import { Resume } from "../axiosApi/resumeApi";

export const resumeBaseInfoApi = async (param) => {
  const result = await axios.post(Resume.BasicInfoResume, param);
  return result.data.result;
};
