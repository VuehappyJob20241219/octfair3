import { useQuery } from "@tanstack/vue-query";
import { applicantListSearchApi } from "../../../api/applicant/applicantListSearchApi";

export const useApplicantListSearchQuery = (injectedValue, cPage) => {
  return useQuery({
    queryKey: ["applicantList", injectedValue, cPage],
    queryFn: () => applicantListSearchApi(injectedValue, cPage),
  });
};
