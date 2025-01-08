import { useQuery } from "@tanstack/vue-query";
import { companyUpdateSearchApi } from "../../../api/company/companyUpdateSearchApi";

export const useCompanySearchQuery = (loginId) => {
  return useQuery({
    queryKey: ["companyDetail"],
    queryFn: () => companyUpdateSearchApi(loginId),
  });
};
