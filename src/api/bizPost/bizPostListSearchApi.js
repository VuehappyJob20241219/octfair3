import axios from "axios";
import { BizPost } from "../axiosApi/bizPostApi";

export const bizPostListSearchApi = async (injectedValue, cPage,userType) => {
  const param = {
    currentPage: cPage.toString(),
    pageSize: (5).toString(),
  };
  if (userType === "B") {
    const result = await axios.post(BizPost.BizPostList, param);
    return result.data;
  } else {
    Object.assign(param, injectedValue);
    const result = await axios.post(BizPost.SearchBizPostList, param);
    return result.data;
  }
  
};
