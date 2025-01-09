import { useQuery } from "@tanstack/vue-query"
import { faqListSearchApi } from "../../../api/faq/faqListSearchApi";

export const useFaqListSearchQuery = (injectedValue, cPage, faq_type) => {        
    return useQuery({
        queryKey: [ "faqList", injectedValue, cPage, faq_type],
        queryFn: () => faqListSearchApi(injectedValue.value, cPage.value, faq_type.value),        
    });
}