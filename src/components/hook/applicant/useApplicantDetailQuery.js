import { useQuery } from "@tanstack/vue-query";
import { applicantDetailApi } from "../../../api/applicant/applicantDetailApi";

export const useApplicantDetailQuery = (props) => {
  return useQuery({
    queryKey: ["applicantDetail"],
    queryFn: () => applicantDetailApi(props),
    enabled: !!props.loginId,
  });
};
