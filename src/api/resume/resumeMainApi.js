import axios from "axios";
import { Resume } from "../axiosApi/resumeApi";

export const resumeMainApi = async (param) => {
  const result = await axios.post(Resume.MainResume, param);
  return result.data;
};
