import axios from "axios";
import { Resume } from "../axiosApi/resumeApi";

export const resumeDeleteApi = async (idx) => {
  const param = {
    resIdx: idx,
  };
  const result = await axios.post(Resume.DeleteResume, param);
  return result.data;
};
