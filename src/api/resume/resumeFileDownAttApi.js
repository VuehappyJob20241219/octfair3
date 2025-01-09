import axios from "axios";
import { Resume } from "../axiosApi/resumeApi";

export const resumeFileDownAttApi = async (attIdx, fileName) => {
  let param = new URLSearchParams();
  param.append("attIdx", attIdx);
  const res = await axios.post(Resume.FileDownAtt, param, { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName); // 파일 이름 설정
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // 링크 제거
};
