import axios from "axios";
import { Notice } from "../axiosApi/noticeApi";

export const noticeDetailDeleteApi = async (notiseIdx) => {
  console.log("값 궁금", notiseIdx);
  await axios.post(Notice.DeleteNotice, { noticeSeq: notiseIdx });
};
