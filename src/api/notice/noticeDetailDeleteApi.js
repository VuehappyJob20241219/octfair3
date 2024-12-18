import axios from "axios";
import { Notice } from "../api";

export const noticeDetailDeleteApi = async (notiseIdx) => {
  console.log("값 궁금", notiseIdx);
  await axios.post(Notice.DeleteNotice, { noticeSeq: notiseIdx });
};
