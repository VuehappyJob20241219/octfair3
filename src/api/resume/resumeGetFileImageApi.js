import axios from "axios";
import { Resume } from "../axiosApi/resumeApi";

export const resumeGetFileImageApi = async (profileImageIdx) => {
  console.log("profileImageIdx", profileImageIdx);
  let param = new URLSearchParams();
  param.append("resIdx", profileImageIdx);
  const res = await axios.post(Resume.GetProfileimg, param, { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  return url;
};
