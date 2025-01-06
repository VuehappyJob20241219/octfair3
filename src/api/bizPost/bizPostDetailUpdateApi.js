import axios from "axios";
import { BizPost } from "../axiosApi/bizPostApi";

export const noticeDetailUpdateApi = async (detailValue, fileData, idx) => {
  const textData = {
    ...detailValue,
    context: detailValue.context,
    noticeSeq: idx,    
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
