import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router"
import { faqDetailInsertApi } from "../../../api/faq/faqDetailInsertApi";

export const useFaqDetailInsertMutation = (detailValue, userid) => {    
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['faqInsert'],
        mutationFn: () => faqDetailInsertApi(detailValue.value, userid),
        onSuccess: ()=>{
            router.go(-1);
            queryClient.invalidateQueries({
                queryKey: ['faqList'],
            });
        },
    });
};