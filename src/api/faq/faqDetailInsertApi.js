import axios from "axios"
import { Faq } from "../axiosApi/faqApi"

export const faqDetailInsertApi = (detailValue, userid) => {
    const textData = {
        title: detailValue.title,
        context: detailValue.content,
        faq_type: detailValue.faq_type,
        loginId: userid,
    }
    if(!detailValue.faq_type){
        alert("회원유형을 선택해 주세요")
        return;
      }
      if(!detailValue.title || detailValue.title.trim() === ""){
        alert("제목을 입력해 주세요")
        return;
      }
      if(!detailValue.content || detailValue.content.trim() === ""){
        alert("내용을 입력해 주세요")
        return;
      }
    const result = axios.post(Faq.InsertFaqDetail, textData);
    return result.data;
}