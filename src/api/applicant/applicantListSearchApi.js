import axios from "axios";
import { Applicant } from "../axiosApi/applicantApi";

export const applicantListSearchApi = async (injectedValue, cPage) => {
  const data = {
    ...injectedValue.value,
    currentPage: cPage.value.toString(),
    pageSize: (5).toString(),
  };

  const result = await axios.post(Applicant.ApplicantSearchList, data);
  return result.data;
};
