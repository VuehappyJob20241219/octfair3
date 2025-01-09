import { useQuery } from "@tanstack/vue-query"
import { faqDetailSearchApi } from "../../../api/faq/faqDetailSearchApi";

export const useFaqDetailSearchQuery = (idx) =>{
    return useQuery({
        queryKey: ['faqDetail'],
        queryFn: () => faqDetailSearchApi(idx),
        enabled: !!idx,
    })
}