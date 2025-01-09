import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { useRouter } from "vue-router";
import { faqDetailUpdateApi } from "../../../api/faq/faqDetailUpdateApi";

export const useFaqDetailUpdateMutation = (detailValue) =>{    
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationKey: ['faqUpdate'],
        mutationFn: () => faqDetailUpdateApi(detailValue.value),
        onSuccess: () => {
            alert("수정 되었습니다.")
            router.go(-1);
            queryClient.invalidateQueries({
                queryKey:['faqList'],
            })
        }
    })
}