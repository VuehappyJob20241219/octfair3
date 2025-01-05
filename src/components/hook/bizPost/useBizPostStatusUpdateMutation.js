import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { bizPostStatusUptateApi } from "../../../api/bizPost/bizPostStatusUptateApi";

export const useBizPostStatusUpdateMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({ postIdx, status }) => bizPostStatusUptateApi(postIdx, status),
    mutationKey: ["bizPostStatusUptate"],
    onSuccess: (data, { status }) => {
      alert("처리되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["bizPostDetail"],
      });
      if (status == "승인") {
        router.push({ name: "managePost" });
      } else if (status == "불허") {
        router.push({ name: "managePostApproval" });
      }
    },
  });
};
