import axios from "axios";
import { Scrap } from "../axiosApi/scrapApi";

export const scrapListApi = async (injectedValue, cPage) => {
  const param = {
    ...injectedValue,
    currentPage: cPage.toString(), 
    pageSize: "4",

  };
  console.log("api currentPage ------------>", param.currentPage);
  console.log("api pageSize ------------>", param.pageSize);
//   console.log("api keyWord ------------>", param.keyWord);
   //const result = await axios.post(History.HistoryList, param);

  const result = await axios.post(Scrap.ScrapList, param, {
      headers: {
          'Content-Type': 'application/json',
      },
  });

  return result.data;
};
