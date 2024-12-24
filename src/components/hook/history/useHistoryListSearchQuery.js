import { useQuery } from "@tanstack/vue-query";
import { historyListSearchApi } from "../../../api/history/historyListSearchApi";

export const useHistoryListSearchQuery = ( cPage) => {
  return useQuery({
    queryKey: ["historyList",  cPage],
    queryFn: () => historyListSearchApi( cPage.value),
    staleTime: 1000 * 60,
  });
};
