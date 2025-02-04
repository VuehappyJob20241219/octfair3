import axios from "axios";
import { Notice } from "../axiosApi/noticeApi";

export const noticeDetailUpdateApi = async (detailValue, fileData, idx) => {
  const textData = {
    ...detailValue,
    context: detailValue.content,
    noticeSeq: idx,    
  };
  const formData = new FormData();
  if (fileData) {
    formData.append("file", fileData);
  }
  formData.append("text",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    })
  );
  await axios.post(Notice.UpdateNoticeFile, formData);
};
