import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeInsertCareerApi } from "../../../api/resume/resumeInsertCareerApi";

export const useResumeAddCareerMutation = (resIdx, careerInfo) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return resumeInsertCareerApi(resIdx, careerInfo);
    },
    mutationKey: ["resumeAddCareer"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["detailCareer"],
        exact: true,
      });
    },
  });
};
