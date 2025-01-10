import axios from "axios";
import { Notice } from "../axiosApi/noticeApi";

export const noticeDetailDeleteApi = async (noticeIdx) => {
  await axios.post(Notice.DeleteNotice, { noticeSeq: noticeIdx });
};
