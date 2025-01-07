import { useMutation } from "@tanstack/vue-query";
import { applicantDetailUpdateApi } from "../../../api/applicant/applicantDetailUpdateApi";
import { useModalStore } from "../../../stores/modalState";

export const useApplicantDetailUpdateMutation = (
  applicantDetailValue,
  emit
) => {
  const modalStateApplicant = useModalStore();

  return useMutation({
    mutationFn: () => applicantDetailUpdateApi(applicantDetailValue),
    mutationKey: ["applicantUpdate"],
    onSettled: (data, error) => {
      if (data) {
        modalStateApplicant.setModalState();
        emit("postSuccess");
      }
    },
  });
};
