import axios from "axios";
import { Notice } from "../api";

export const noticeDetailUpdateApi = async (detailValue, fileData, idx) => {
  const textData = {
    ...detailValue,
    noticeSeq: idx,
    context: detailValue.context,
  };
  const formData = new FormData();
  if (fileData) {
    formData.append("file", fileData);
  }
  formData.append(
    "text",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    })
  );
  await axios.post(Notice.UpdateNoticeFile, formData);
};
