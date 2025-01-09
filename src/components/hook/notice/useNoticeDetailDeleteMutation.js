import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { noticeDetailDeleteApi } from "../../../api/notice/noticeDetailDeleteApi";

export const useNoticeDetailDeleteMutation = (notiseIdx) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => noticeDetailDeleteApi(notiseIdx),
    mutationKey: ["noticeDelete"],
    onSuccess: () => {
      alert("삭제 되었습니다.")
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["noticeList"],
      });
    },
  });
};
