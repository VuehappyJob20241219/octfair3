import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeInsertAttApi } from "../../../api/resume/resumeInsertAttApi";

export const useResumeAddAttMutation = (resIdx, attachmentInfo, attFileData) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return resumeInsertAttApi(resIdx, attachmentInfo, attFileData);
    },
    mutationKey: ["resumeAddAttachment"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["detailAtt"],
        exact: true,
      });
    },
  });
};
