import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeDeleteCertApi = async (resIdx, certIdx) => {
  const param = {
    resIdx: resIdx,
    certIdx: certIdx,
  };
  const result = await axios.post(ResumeAddTable.DeleteCertification, param);
  return result.data;
};
