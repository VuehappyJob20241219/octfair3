import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeDeleteAttApi } from "../../../api/resume/resumeDeleteAttApi";

export const useResumeDeleteAttachmentMutation = (resIdx) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (attIdx) => {
      return await resumeDeleteAttApi(resIdx, attIdx);
    },
    mutationKey: ["resumeDeleteAtt", resIdx],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["detailAtt"],
      });
    },
  });
};
