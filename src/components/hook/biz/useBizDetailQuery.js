import { useQuery } from "@tanstack/vue-query";
import { bizDetailApi } from "../../../api/biz/bizDetailApi";

export const useBizDetailQuery = (props) => {
  return useQuery({
    queryKey: ["bizDetail", props],
    queryFn: () => bizDetailApi(props),
    enabled: !!props.bizIdx,
    staleTime: 1000 * 60,
  });
};
