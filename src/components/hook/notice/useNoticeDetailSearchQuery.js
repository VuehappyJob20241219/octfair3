import { useQuery } from "@tanstack/vue-query";
import { noticeDetailSearchApi } from "../../../api/notice/noticeDetailSearchApi";

export const useNoticeDetailSearchQuery = (idx) => {
    return useQuery({
      queryKey: ['noticeDetail', idx],
      queryFn: async () => {
        const noticeDetail = await noticeDetailSearchApi(idx);
          if (['jpg', 'gif', 'png', 'webp'].includes(noticeDetail.fileExt)) {
            const imageUrl = await getFileImage(idx);
            return { ...noticeDetail, imageUrl };
          }
          return noticeDetail;
      },
      enabled: !!idx,
      staleTime: 1000 * 1,
    });
  };
