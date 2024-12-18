import axios from "axios";
import { Notice } from "../api";

export const noticeListSearchApi = async (injectedValue, cPage) => {
  const param = new URLSearchParams({
    ...injectedValue,
    currentPage: cPage,
    pageSize: 5,
  });
  const result = await axios.post(Notice.SearchNoticeList, param);

  return result.data;
};
