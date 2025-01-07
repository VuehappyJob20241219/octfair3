import { useMutation } from "@tanstack/vue-query";
import { applicantResetPwApi } from "../../../api/applicant/applicantResetPwApi";

export const useApplicantResetPwMutation = (applicantDetailValue) => {
  return useMutation({
    mutationFn: () => applicantResetPwApi(applicantDetailValue),
    mutationKey: ["resetPw"],
    onSettled: (data, error) => {
      if (data.result === "success") {
        alert("비밀번호가 초기화되었습니다.");
      }
    },
  });
};
