import axios from "axios";
import { Applicant } from "../axiosApi/applicantApi";

export const applicantDetailApi = async (props) => {
  const param = new URLSearchParams({
    loginId: props.loginId,
  });

  const result = await axios.post(Applicant.ApplicantDetail, param);

  return result.data;
};
