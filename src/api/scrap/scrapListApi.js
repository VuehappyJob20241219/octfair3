import axios from "axios";
import { Scrap } from "../axiosApi/scrapApi";

export const scrapListApi = async (injectedValue, cPage) => {
  const param = {
    ...injectedValue,
    currentPage: cPage.toString(), 
    pageSize: "4",

  };

  const result = await axios.post(Scrap.ScrapList, param, {
      headers: {
          'Content-Type': 'application/json',
      },
  });

  // const postIndexes = result.data.scrapList.map(item => item.postIdx);

  // await axios.post(Scrap.ScrapUpdate, { postIndexes }, {
  //     headers: {
  //           'Content-Type': 'application/json',
  //       },
  // });

  return result.data;
};
