import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { scrapDeleteApi } from "../../../api/scrap/scrapDeleteApi";


export const useScrapDeleteMutation = ({scrapIndexes}) => {
  const queryClient = useQueryClient;
  return useMutation({
    mutationFn: () => scrapDeleteApi({scrapIndexes}),
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
