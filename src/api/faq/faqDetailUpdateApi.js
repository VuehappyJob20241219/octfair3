import axios from "axios";
import { Faq } from "../axiosApi/faqApi";

export const faqDetailUpdateApi = async (detailValue) => {
    const textData = {
        ...detailValue.value,
        title: detailValue.title,
        context: detailValue.content,
        faq_type: detailValue.faq_type,
        faqSeq: detailValue.faq_idx,
      };
    await axios.post(Faq.UpdateFaqDetail, textData);
}