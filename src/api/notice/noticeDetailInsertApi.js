import axios from "axios";
import { Notice } from "../axiosApi/noticeApi";

export const insertNoticeDetail = async (detailValue, fileData, userid) => {
  const textData = {
    title: detailValue.title,
    content: detailValue.content,
    loginId: userid,
  };
  if(!detailValue.title || detailValue.title.trim() === ""){
    alert("제목을 입력해 주세요")
    return;
  }
  if(!detailValue.content || detailValue.content.trim() === ""){
    alert("내용을 입력해 주세요")
    return;
  }
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
