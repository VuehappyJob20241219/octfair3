import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeDeleteAttachFileApi } from "../../../api/resume/resumeDeleteAttachFileApi";

export const useResumeDeleteFileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (resIdx) => {
      return resumeDeleteAttachFileApi(resIdx);
    },
    mutationKey: ["resumeDeleteAtt"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["resumeUdateInfo", resIdx],
      });
    },
  });
};
