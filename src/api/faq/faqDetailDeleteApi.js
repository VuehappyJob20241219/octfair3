import axios from "axios"
import { Faq } from "../axiosApi/faqApi"

export const faqDetailDeleteApi = (idx) => {
    axios.post(Faq.DeleteFaqDetail, idx);
}