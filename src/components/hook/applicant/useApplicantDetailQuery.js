import { useQuery } from "@tanstack/vue-query";
import { applicantDetailApi } from "../../../api/applicant/applicantDetailApi";

export const useApplicantDetailQuery = (props) => {
  return useQuery({
    queryKey: ["applicantDetail", props.loginId],
    queryFn: () => applicantDetailApi(props),
    enabled: !!props.loginId,
    staleTime: 1000 * 60,
  });
};
