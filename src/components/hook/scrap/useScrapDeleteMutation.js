import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { scrapDeleteApi } from "../../../api/scrap/scrapDeleteApi";


export const useScrapDeleteMutation = ({scrapIndexes}) => {
  const queryClient = useQueryClient;
  console.log("뮤테이션에서 스크랩인덱스===============================" + {scrapIndexes})
  return useMutation({
    mutationFn: () => scrapDeleteApi({scrapIndexes}),
    mutationKey: ["scrapDelete"],
    onSuccess: () => {
      alert("스크랩 삭제 성공");
      window.location.reload(); //새로고침
      queryClient.invalidateQueries({
        queryKey: ["bizPostDetail"], //임시로 작성, 공고리스트 useQuery안쓴거같음
      });
    },
  });
};
