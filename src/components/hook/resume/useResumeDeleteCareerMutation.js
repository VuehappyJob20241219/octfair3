import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeDeleteCareerApi } from "../../../api/resume/resumeDeleteCareerApi";

export const useResumeDeleteCareerMutation = (resIdx) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (crrIdx) => {
      return await resumeDeleteCareerApi(resIdx, crrIdx);
    },
    mutationKey: ["resumeDeleteCareer", resIdx],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["detailCareer"],
      });
    },
  });
};
