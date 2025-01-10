import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeInsertEduApi } from "../../../api/resume/resumeInsertEduApi";

export const useResumeAddEduMutation = (resIdx, educationInfo) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return resumeInsertEduApi(resIdx, educationInfo);
    },
    mutationKey: ["resumeAddEdu"],
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["detailEdu"],
        exact: true,
      });
    },
  });
};
