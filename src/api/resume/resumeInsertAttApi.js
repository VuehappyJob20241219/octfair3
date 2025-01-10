import axios from "axios";
import { ResumeAddTable } from "../axiosApi/resumeApi";

export const resumeInsertAttApi = async (resIdx, attachmentInfo, attFileData) => {
  const validation = [
    { key: "category", message: "파일 유형을 선택해주세요" },
    { key: "content", message: "첨부파일에 대한 설명을 기재해주세요" },
  ];

  if (attachmentInfo.value.category === "none") {
    alert("파일 유형을 선택해주세요.");
    return;
  }

  for (const rule of validation) {
    if (!attachmentInfo.value[rule.key]) {
      alert(rule.message);
      return;
    }
  }
  if (!attFileData.value || !(attFileData.value instanceof File)) {
    alert("첨부파일이 없습니다.");
    return;
  }

  const text = {
    resIdx: resIdx.value.resIdx,
    category: attachmentInfo.value.category,
    content: attachmentInfo.value.content,
  };
  const formData = new FormData();
  if (attFileData.value) {
    formData.append("file", attFileData.value);
  }
  formData.append(
    "text",
    new Blob([JSON.stringify(text)], {
      type: "application/json",
    })
  );
  const result = await axios.post(ResumeAddTable.InsertAttachment, formData);
  return result.data;
};
