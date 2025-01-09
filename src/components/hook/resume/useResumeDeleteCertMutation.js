import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeDeleteCertApi } from "../../../api/resume/resumeDeleteCertApi";

export const useResumeDeleteCertMutation = (resIdx) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (certIdx) => {
      return await resumeDeleteCertApi(resIdx, certIdx);
    },
    mutationKey: ["resumeDeleteCert", resIdx],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["detailCert"],
      });
    },
  });
};
