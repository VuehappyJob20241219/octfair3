import axios from "axios";
import { BizPost } from "../axiosApi/bizPostApi";

export const insertBizPostDetail = async (postDetail,fileData) => {
  const textData = {
    ...postDetail.value,
  };
  const formData = new FormData();
  if (fileData.value) {
    formData.append("file", fileData.value);
  }
  formData.append(
    "text",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    })
  );
  const result = await axios.post(BizPost.InsertBizPost, formData);
  return result.data;  
};
