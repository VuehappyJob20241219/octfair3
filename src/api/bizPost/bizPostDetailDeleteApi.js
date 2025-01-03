import axios from "axios";
import { BizPost } from "../axiosApi/bizPostApi";

export const bizPostDetailDeleteApi = async (pIdx, bIdx) => {
  const params = {
    postIdx: pIdx,
    bizIdx: bIdx,
  };
  await axios.post(BizPost.DeleteBizPost, params);
};
