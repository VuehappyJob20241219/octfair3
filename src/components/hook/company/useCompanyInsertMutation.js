import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { companyInsertApi } from "../../../api/company/companyInsertApi";

export const useCompanyInsertMutation = (loginId, detailValue, fileData, imageUrl, fileName) => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => companyInsertApi(loginId, detailValue, fileData, imageUrl, fileName),
    mutationKey: ["companyInsert"],
    onSuccess: (res) => {
      if (res.result === "success") {
        alert("기업이 등록되었습니다.");
        router.go(-1);
      } else if (res.result === "fail") {
        alert("기업등록에 실패했습니다.");
      }
    },
  });
};
