import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { companyUpdateApi } from "../../../api/company/companyUpdateApi";

export const useCompanyUpdateMutation = (loginId, detailValue, fileData, imageUrl, fileName) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => companyUpdateApi(loginId, detailValue, fileData, imageUrl, fileName),
    mutationKey: ["companyUpdate"],
    onSuccess: (res) => {
      if (res.result === "success") {
        alert("기업정보가 수정되었습니다.");
        router.go(-1);
        queryClient.invalidateQueries({
          queryKey: ["companyDetail"],
        });
      } else if (res.result === "fail") {
        alert("기업정보 수정에 실패했습니다.");
      }
    },
  });
};
