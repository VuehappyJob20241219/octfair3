import { useMutation } from "@tanstack/vue-query";
import { ApplicantResetPw } from "../../../api/applicant/ApplicantResetPwApi";

export const useApplicantResetPwMutation = (applicantDetailValue) => {
  return useMutation({
    mutationFn: () => ApplicantResetPw(applicantDetailValue),
    mutationKey: ["resetPw"],
    onSettled: (data, error) => {
      if (data.result === "success") {
        alert("비밀번호가 초기화되었습니다.");
      }
    },
  });
};
