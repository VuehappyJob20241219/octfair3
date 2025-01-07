import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeDetailAttApi = async (idx) => {
  const result = await axios.post(ResumeAddTable.ListAttachment, { resIdx: idx });
  return result.data;
};
