import { useQuery } from "@tanstack/vue-query";
import { applyUserResumeListApi } from "../../../api/apply/applyUserResumeListApi";

export const useApplyUserResumeList = (loginId) => { 
  return useQuery({
    queryKey: ["ResumeList"],
    queryFn: () => applyUserResumeListApi(loginId),
    // staleTime: 1000 * 60,
  });
};
