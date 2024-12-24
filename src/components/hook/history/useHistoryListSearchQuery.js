import { useQuery } from "@tanstack/vue-query";
import { historyListSearchApi } from "../../../api/history/historyListSearchApi";

export const useHistoryListSearchQuery = (injectedValue, cPage) => {
  return useQuery({
    queryKey: ["historyList", injectedValue, cPage],
    queryFn: () => historyListSearchApi(injectedValue.value, cPage.value),
    staleTime: 1000 * 60,
  });
};
