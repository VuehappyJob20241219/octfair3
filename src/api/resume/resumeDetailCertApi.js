import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeDetailCertApi = async (idx) => {
  const result = await axios.post(ResumeAddTable.ListCertification, { resIdx: idx });
  return result.data;
};
