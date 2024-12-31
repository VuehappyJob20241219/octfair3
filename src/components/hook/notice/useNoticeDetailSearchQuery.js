import { useQuery } from "@tanstack/vue-query";
import { noticeDetailSearchApi } from "../../../api/notice/noticeDetailSearchApi";

export const useNoticeDetailSearchQuery = (idx) => {
    return useQuery({
      queryKey: ['noticeDetail', idx],
      queryFn: () => noticeDetailSearchApi(idx),
      enabled: !!idx,
      staleTime: 1000 * 1,
    });
  };