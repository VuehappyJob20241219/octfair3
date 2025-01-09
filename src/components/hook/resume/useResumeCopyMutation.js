import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeCopyApi } from "../../../api/resume/resumeCopyApi";

export const useResumeCopyMutation = (cPage) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idx) => resumeCopyApi(idx),
    mutationKey: ["resumeCopy"],
    onSuccess: async () => {
      await queryClient.invalidateQueries(["resumeSearchList", cPage]); // 쿼리 키를 배열로 전달
    },
  });
};
