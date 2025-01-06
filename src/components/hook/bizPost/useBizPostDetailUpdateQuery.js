import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { bizPostDetailUpdateApi } from "../../../api/bizPost/bizPostDetailUpdateApi";

export const useNoticeDetailUpdateMutation = (detailValue, fileData, idx) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => noticeDetailUpdateApi(detailValue.value, fileData.value, idx),
    mutationKey: ["noticeUpdate"],
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["noticeList"],
      });
    },
  });
};
