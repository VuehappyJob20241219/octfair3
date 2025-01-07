import { useMutation } from "@tanstack/vue-query";
import { resumeFileDownAttApi } from "../../../api/resume/resumeFileDownAttApi";

export const useResumeFileDownloadAttachmentMutation = () => {
  return useMutation({
    mutationFn: async ({ attIdx, fileName }) => {
      return await resumeFileDownAttApi(attIdx, fileName);
    },
    mutationKey: ["fileDownAtt"],
  });
};
