import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeDeleteApi } from "../../../api/resume/resumeDeleteApi";

export const useResumeDeleteMutation = (cPage) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idx) => resumeDeleteApi(idx),
    mutationKey: ["resumeDelete"],
    onSuccess: async () => {
      await queryClient.invalidateQueries(["resumeSearchList", cPage]);
      await queryClient.invalidateQueries(["mainResumeDetail"]);
    },
  });
};
