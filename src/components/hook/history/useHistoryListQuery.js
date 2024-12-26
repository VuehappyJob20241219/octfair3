import { useQuery } from "@tanstack/vue-query";
import { historyListApi } from "../../../api/history/historyListApi";

export const useHistoryListQuery = (injectedValue, cPage) => {
  return useQuery({
    queryKey: ["historyList",injectedValue, cPage],
    queryFn: () => historyListApi(injectedValue.value, cPage.value),
    //staleTime: 1000 * 60,
  });
};
