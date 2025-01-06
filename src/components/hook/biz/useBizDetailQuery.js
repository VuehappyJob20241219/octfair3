import { useQuery } from "@tanstack/vue-query";
import { bizDetailApi } from "../../../api/biz/bizDetailApi";

export const useBizDetailQuery = (props) => {
  return useQuery({
    queryKey: ["bizDetail"],
    queryFn: () => bizDetailApi(props),
    enabled: !!props.bizIdx,
  });
};
