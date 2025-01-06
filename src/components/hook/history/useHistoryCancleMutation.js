import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { historyCancleApi } from "../../../api/history/historyCancleApi";

export const useHistoryCancleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appId) => {
      const userConfirmed = window.confirm("지원 취소 하시겠습니까?");
      if (!userConfirmed) {
        return Promise.reject(); // 작업 중단
      }
      return historyCancleApi(appId); // 작업 진행
    },
    mutationKey: ["historyCancle"],

    onSuccess: () => {
      alert("지원 취소 되었습니다");
      queryClient.invalidateQueries({
        queryKey: ["historyList"],
      });
      window.location.reload(); // 새로고침
    },

  });
};