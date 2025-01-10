import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeInsertCertApi } from "../../../api/resume/resumeInsertCertApi";

export const useResumeAddCertMutation = (resIdx, certificationInfo) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return resumeInsertCertApi(resIdx, certificationInfo);
    },
    mutationKey: ["resumeAddCert"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["detailCert"],
        exact: true,
      });
    },
  });
};
