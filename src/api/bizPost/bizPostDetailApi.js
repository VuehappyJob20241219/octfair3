import axios from "axios";
import { BizPost } from "../axiosApi/bizPostApi";

export const bizPostDetailApi = async (params) => {
  const result = await axios.post(BizPost.BizPostList, params);
  return result.data;  
};
