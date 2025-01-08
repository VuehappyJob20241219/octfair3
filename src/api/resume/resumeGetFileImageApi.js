import axios from "axios";
import { Resume } from "../axiosApi/resumeApi";

export const resumeGetFileImageApi = async (profileImageIdx) => {
  let param = new URLSearchParams();
  param.append("resIdx", profileImageIdx);
  try {
    const res = await axios.post(Resume.GetProfileimg, param, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    return url;
  } catch (error) {
    const url = "/no_image.jpg"; // 실패 시 퍼블릭 폴더의 이미지 URL로 대체
    return url; // 대체 이미지 URL 반환
  }
};
