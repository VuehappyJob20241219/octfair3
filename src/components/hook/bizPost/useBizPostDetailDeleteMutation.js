import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { bizPostDetailDeleteApi } from "../../../api/bizPost/bizPostDetailDeleteApi";

export const useBizPostDetailDeleteMutation = (postDetail, bizDetail) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => bizPostDetailDeleteApi(postDetail.value.postIdx, bizDetail.value.bizIdx),
    mutationKey: ["bizPostDelete"],
    onSuccess: () => {
      alert("삭제 처리되었습니다.");
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["bizPostDetail"],
      });
    },
  });
};
