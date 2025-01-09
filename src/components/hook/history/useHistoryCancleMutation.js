import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { historyCancleApi } from "../../../api/history/historyCancleApi";

export const useHistoryCancleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appId, status }) => {
      let userConfirmed;
      if (status === '최종합격') {
        userConfirmed = window.confirm("합격된 공고입니다. 지원 취소하시겠습니까?")
      } else {
        userConfirmed = window.confirm("지원 취소하시겠습니까?")
      }
      
      if (!userConfirmed) {
        return Promise.reject(); //삭제 중단
      }
      
      return historyCancleApi(appId); //삭제 진행
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