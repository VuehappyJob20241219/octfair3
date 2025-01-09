import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { companyUpdateSearchApi } from "../../../api/company/companyUpdateSearchApi";

export const useCompanySearchQuery = (loginId) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["companyDetail"],
    queryFn: () => companyUpdateSearchApi(loginId),
    staleTime: 0,
    cacheTime: 0,
    onSuccess: () => queryClient.invalidateQueries(["companyDetail"]),
  });
};
