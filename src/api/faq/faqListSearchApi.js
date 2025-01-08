import axios from "axios"
import { Faq } from "../axiosApi/faqApi"

export const faqListSearchApi = async (injectValue, cPage, faq_type) => {
    const param = new URLSearchParams({
        ...injectValue,
        
        currentPage: cPage,
        pageSize: 5,
        faq_type: faq_type,
    })
    const result = await axios.post(Faq.SearchFaqList, param);
    if (result.data) {
        result.data.faq.forEach((faq, index) => {
            faq.faq_idx = result.data.faq.length - index;
        });
        console.log(result.data);
      }        
    return result.data;
}