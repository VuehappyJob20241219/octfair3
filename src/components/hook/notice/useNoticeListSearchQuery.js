import { useQuery } from "@tanstack/vue-query";
import { noticeListSearchApi } from "../../../api/notice/noticeListSearchApi";

export const useNoticeListSearchQuery = (injectedValue, cPage) => {
  return useQuery({
    //qeuryKey: ["noticeList"],
    //검색
    queryKey: ["noticeList", injectedValue, cPage],
    queryFn: () => noticeListSearchApi(injectedValue.value, cPage.value),
    staleTime: 1000 * 60,
    // 신선한상태를 보장하는 시간 1분(매번(예 뒤로가기) 재조회를 하지않음)
    // refetchInterval: 1000,  // 1초마다 데이터 가져옴
  });
};
