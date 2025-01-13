import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeInsertSkillApi } from "../../../api/resume/resumeInsertSkillApi";

export const useResumeAddSkillMutation = (resIdx, skillInfo) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return resumeInsertSkillApi(resIdx, skillInfo);
    },
    mutationKey: ["resumeAddSkill"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["detailSkill"],
        exact: true,
      });
    },
  });
};
