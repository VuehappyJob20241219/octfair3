import axios from "axios";
import { Notice } from "../axiosApi/noticeApi";

export const noticeDetailSearchApi = async (idx) => { 
  console.log(idx);
  const respone = await axios.post(Notice.SearchNoticeDetail, { noticeSeq : idx });  
  return respone.data;
};

