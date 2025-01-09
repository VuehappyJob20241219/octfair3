import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeDeleteEduApi } from "../../../api/resume/resumeDeleteEduApi";

export const useResumeDeleteEduMutation = (resIdx) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (eduIdx) => {
      return await resumeDeleteEduApi(resIdx, eduIdx);
    },
    mutationKey: ["resumeDeleteEdu"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["detailEdu"],
      });
    },
  });
};
