import axios from "axios";
import { BizPost } from "../axiosApi/bizPostApi";
import { Scrap } from "../axiosApi/scrapApi";

export const bizPostDetailDeleteApi = async (pIdx, bIdx) => {
  const params = {
    postIdx: pIdx,
    bizIdx: bIdx,
  };
  await axios.post(Scrap.ScrapUpdate, {postIndexes:[pIdx]});
  await axios.post(BizPost.DeleteBizPost, params);
};
