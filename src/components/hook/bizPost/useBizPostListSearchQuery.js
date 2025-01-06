import { useQuery } from "@tanstack/vue-query";
import { bizPostListSearchApi } from "../../../api/bizPost/bizPostListSearchApi";

export const useBizPostListSearchQuery = (cPage, injectedValue,userType) => {  
  return useQuery({
    queryKey: ["HirePost", injectedValue, cPage],
    queryFn: () => bizPostListSearchApi(injectedValue.value, cPage.value,userType),
    // staleTime: 1000 * 60,
  });
};
