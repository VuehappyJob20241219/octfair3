import { useQuery } from "@tanstack/vue-query";
import { bizListSearchApi } from "../../../api/biz/bizListSearchApi";

export const useBizListSearchQuery = (injectedValue, cPage) => {
  return useQuery({
    queryKey: ["bizList", injectedValue, cPage],
    queryFn: () => bizListSearchApi(injectedValue, cPage),
    staleTime: 1000 * 60,
  });
};
