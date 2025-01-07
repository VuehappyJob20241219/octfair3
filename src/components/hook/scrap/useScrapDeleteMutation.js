import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { scrapDeleteApi } from "../../../api/scrap/scrapDeleteApi";


export const useScrapDeleteMutation = () => {
  const queryClient = useQueryClient;
  return useMutation({
    mutationFn: ({scrapIndexes}) => scrapDeleteApi({scrapIndexes}),
    mutationKey: ["scrapDelete"],
    onSuccess: () => {
      alert("스크랩 삭제 성공");
      window.location.reload(); //새로고침
      queryClient.invalidateQueries({
        queryKey: ["scrapList"], 
      });
    },
  });
};
