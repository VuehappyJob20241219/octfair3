import axios from "axios";
import { BizPost } from "../axiosApi/bizPostApi";

export const bizPostStatusUptateApi = async (pIdx, status) => {
  const params = {
    postIdx: pIdx,
    appStatus: status,
  };
  await axios.post(BizPost.UpdatePostStatus, params);
};
