import { useQuery } from "@tanstack/vue-query";
import { bizPostDetailApi } from "../../../api/bizPost/bizPostDetailApi";

export const useBizPostDetailQuery = (params) => { 
  console.log(params); 
  return useQuery({
    queryKey: ["bizPostDetail"],
    queryFn: () => bizPostDetailApi(params),
    staleTime: 1000 * 60,
  });
};
