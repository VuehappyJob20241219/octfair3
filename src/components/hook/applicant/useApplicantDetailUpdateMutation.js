import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { applicantDetailUpdateApi } from "../../../api/applicant/applicantDetailUpdateApi";
import { useModalStore } from "../../../stores/modalState";

export const useApplicantDetailUpdateMutation = (
  applicantDetailValue,
  emit
) => {
  const modalStateApplicant = useModalStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => applicantDetailUpdateApi(applicantDetailValue),
    mutationKey: ["applicantUpdate"],
    onSettled: (data, error) => {
      if (data) {
        modalStateApplicant.setModalState();
        queryClient.removeQueries({
          queryKey: ["applicantList"],
        });
        emit("postSuccess");
      }
    },
  });
};
