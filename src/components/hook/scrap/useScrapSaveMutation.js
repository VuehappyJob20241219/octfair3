import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { scrapSaveApi } from "../../../api/scrap/scrapSaveApi";
import { useRouter } from "vue-router";


export const useScrapSaveMutation = (postIdx) => {
  const queryClient = useQueryClient;
  const router = useRouter();
  return useMutation({
    mutationFn: () => scrapSaveApi(postIdx),
    mutationKey: ["scrapSave"],
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["HirePost"], //임시로 작성, 공고리스트 useQuery안쓴거같음
      });
    },
  });
};
