import axios from "axios";
import { Biz } from "../axiosApi/bizApi";

export const bizDetailApi = async (props) => {
  const param = new URLSearchParams({
    bizIdx: props.bizIdx,
  });

  const result = await axios.post(Biz.BizDetail, param);

  return result.data;
};
