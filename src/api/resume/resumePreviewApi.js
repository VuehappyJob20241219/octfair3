import axios from "axios";
import { Resume } from "../axiosApi/resumeApi";

export const resumePreviewApi = async (idx, modalState) => {
  const result = await axios.post(Resume.PreviewResume, { resIdx: idx });
  console.log("result.dataaaaaaaaa", result.data);
  if (result.data.resumeInfo === null) {
    alert("삭제된 이력서입니다.");
    modalState.setModalState();
  }
  return result.data;
};
