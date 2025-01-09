import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeMainApi } from "../../../api/resume/resumeMainApi";

export const useResumeMainMutation = (cPage, userParam) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idx) => {
      const param = {
        loginId: userParam.loginId,
        userNm: userParam.userNm,
        userType: userParam.userType,
        resIdx: idx,
      };
      return resumeMainApi(param); // 필요한 데이터 전달
    },
    mutationKey: ["resumeMain"],
    onSuccess: async () => {
      alert("대표이력서로 설정되었습니다.");
      await queryClient.invalidateQueries(["resumeSearchList", cPage]); // 쿼리 키를 배열로 전달
      await queryClient.invalidateQueries(["mainResumeDetail"]);
    },
  });
};
