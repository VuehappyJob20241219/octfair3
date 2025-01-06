import axios from "axios";
import { Biz } from "../axiosApi/bizApi";

export const bizListSearchApi = async (injectedValue, cPage) => {
  const data = {
    ...injectedValue.value,
    currentPage: cPage.value.toString(),
    pageSize: (5).toString(),
  };

  const result = await axios.post(Biz.BizSearchList, data);

  return result.data;
};
