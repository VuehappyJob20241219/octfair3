import axios from "axios";
import { Faq } from "../axiosApi/faqApi";

export const faqDetailSearchApi = async (idx) => {  
    const respone = await axios.post(Faq.SearchFaqDetail, { faqSeq : idx });
    return respone.data;
  };
  