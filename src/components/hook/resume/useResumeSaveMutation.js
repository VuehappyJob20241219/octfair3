import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeSaveApi } from "../../../api/resume/resumeSaveApi";

export const useResumeSaveMutation = (basicinformation, user, fileData) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return resumeSaveApi(basicinformation, user, fileData);
    },
    mutationKey: ["resumeSave"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["resumeUdateInfo", idx],
        exact: true,
      });
    },
  });
};
