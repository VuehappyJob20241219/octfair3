import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { companyDeleteApi } from "../../../api/company/companyDeleteApi";

export const useCompanyDeleteMutation = (loginId) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => companyDeleteApi(loginId),
    mutationKey: ["companyDelete"],
    onSuccess: (res) => {
      if (res.result === "success") {
        alert("기업이 삭제되었습니다.");
        router.go(-1);
        queryClient.invalidateQueries({
          queryKey: ["companyDetail"],
        });
      } else if (res.result === "fail") {
        alert("기업삭제에 실패했습니다.");
      }
    },
  });
};
