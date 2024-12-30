import { useQuery } from "@tanstack/vue-query";
import { scrapListApi } from "../../../api/scrap/scrapListApi";


export const useScrapListQuery = (injectedValue, cPage) => {
  return useQuery({
    queryKey: ["scrapList",injectedValue, cPage],
    queryFn: () => scrapListApi(injectedValue.value, cPage.value),
    //staleTime: 1000 * 60,
  });
};
