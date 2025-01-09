import axios from "axios";
import { Notice } from "../axiosApi/noticeApi";
import { noticeImageGetApi } from "../notice/noticeImageGetApi";

export const noticeDetailSearchApi = async (idx) => {
  const respone = await axios.post(Notice.SearchNoticeDetail, { noticeSeq : idx });  
  const detail = respone.data.detail;
  let imageUrl = "";
  if (detail.fileExt && (["jpg", "gif", "png", "webp"].includes(detail.fileExt))) {    
    imageUrl = await noticeImageGetApi(idx);
  }
  return { ...respone.data, imageUrl};  
};

