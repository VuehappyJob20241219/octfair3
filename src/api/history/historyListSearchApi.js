import axios from "axios";
import { History } from "../axiosApi/historyApi";

export const historyListSearchApi = async (injectedValue, cPage) => {
  const param = new URLSearchParams({
    ...injectedValue,
    currentPage: cPage,
    pageSize: 5,
  });
  //console.log("api param ------------>", param.toString);
   const result = await axios.post(History.HistoryList, param);

  // const result = await axios.post(History.HistoryList, param, {
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  // });







  console.log("api axios 결과 ---------------------------->" + result);
  console.log("api axios 결과2 ---------------------------->" + result.data);

  return result.data;
};
