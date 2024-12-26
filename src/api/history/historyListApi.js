import axios from "axios";
import { History } from "../axiosApi/historyApi";

export const historyListApi = async (injectedValue, cPage) => {
  const param = {
    ...injectedValue,
    currentPage: cPage.toString(), 
    pageSize: "4",

  };
  console.log("api currentPage ------------>", param.currentPage);
  console.log("api pageSize ------------>", param.pageSize);
  console.log("api keyWord ------------>", param.keyWord);
  console.log("api viewStatus ------------>", param.viewStatus);
   //const result = await axios.post(History.HistoryList, param);

  const result = await axios.post(History.HistoryList, param, {
      headers: {
          'Content-Type': 'application/json',
      },
  });

  console.log("api axios historyCnt 결과 ---------------------------->" + result.data.historyCnt);
  return result.data;
};
