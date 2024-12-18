import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { insertNoticeDetail } from "../../../api/notice/noticeDetailInsertApi";

export const useNoticeDetailInsertMutation = (detailValue, fileData, userid) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => insertNoticeDetail(detailValue.value, fileData.value, userid),
    mutationKey: ["noticeUpdate"],
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["noticeList"],
      });
    },
  });
};
