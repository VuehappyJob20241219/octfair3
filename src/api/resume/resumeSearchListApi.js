import axios from "axios";
import { Resume } from "../axiosApi/resumeApi";

export const resumeSearchListApi = async (param) => {
  const result = await axios.post(Resume.ListResume, param);
  return result.data;
};
