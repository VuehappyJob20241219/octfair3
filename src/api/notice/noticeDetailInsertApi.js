import axios from "axios";
import { Notice } from "../axiosApi/qnaApi";

export const insertNoticeDetail = async (detailValue, fileData, userid) => {
  const textData = {
    title: detailValue.title,
    context: detailValue.content,
    loginId: userid,
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
  await axios.post(Notice.InsertNoticeFile, formData);
};
