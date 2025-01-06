import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { insertBizPostDetail } from "../../../api/bizPost/bizPostDetailInsertApi";

export const useBizPostDetailInsertMutation = (postDetail,fileData,params) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => insertBizPostDetail(postDetail,fileData),
    mutationKey: ["bizPostUpdate"],
    onSuccess: (data, variables) => {
      console.log(data.result);
      if (data.result === "success") {      
        if(params.postIdx){
          alert("성공적으로 수정되었습니다.");
          router.push({ name: "bizPostDetail", params: { postIdx: params.postIdx } });
        }else{
          alert("성공적으로 등록되었습니다.");
          router.push("post.do");
        }
      }
    },
  });
};
