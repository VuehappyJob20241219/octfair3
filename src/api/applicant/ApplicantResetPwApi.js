import axios from "axios";
import { Applicant } from "../axiosApi/applicantApi";

export const ApplicantResetPw = async (applicantDetailValue) => {
  const param = new URLSearchParams({
    loginId: applicantDetailValue.value.loginId,
  });

  const result = await axios.post(Applicant.ApplicantResetPw, param);

  return result.data;
};
