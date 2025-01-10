import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { useRouter } from "vue-router";
import { faqDetailDeleteApi } from "../../../api/faq/faqDetailDeleteApi";

export const useFaqDetailDeleteMutation = (idx) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationKey: ['faqDelete'],
        mutationFn: () => faqDetailDeleteApi({ faqSeq: idx }),
        onSuccess: () =>{
            alert("삭제 처리되었습니다.");
            router.go(-1);
            queryClient.invalidateQueries({
                queryKey: ['faqList'],
            });
        },
    });
};