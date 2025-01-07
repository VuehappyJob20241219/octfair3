import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeDeleteSkillApi } from "../../../api/resume/resumeDeleteSkillApi";

export const useResumeDeleteSkillMutation = (resIdx) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (skillIdx) => {
      return await resumeDeleteSkillApi(resIdx, skillIdx);
    },
    mutationKey: ["resumeDeleteSkill"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["detailSkill"],
      });
    },
  });
};
