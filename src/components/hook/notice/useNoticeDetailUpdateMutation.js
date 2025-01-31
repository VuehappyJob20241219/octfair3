import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { noticeDetailUpdateApi } from "../../../api/notice/noticeDetailUpdateApi";

export const useNoticeDetailUpdateMutation = (detailValue, fileData, idx) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => noticeDetailUpdateApi(detailValue.value, fileData.value, idx),
    mutationKey: ["noticeUpdate"],
    onSuccess: () => {
      alert("수정 되었습니다.")
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["noticeList"],
      });
    },
  });
};
