import axios from 'axios';
import { useUserInfo } from '@/stores/userInfo'
import { Qna } from '../axiosApi/qnaApi';


export const qnaDetailSaveApi = async (qnaDetail,fileData) => {
    const userInfo = useUserInfo();
    
    const textData = {
        qnaTit: qnaDetail.value.title,
        qnaCon: qnaDetail.value.content,
        password: qnaDetail.value.password,
        loginId: userInfo.user.loginId,
        qna_type: userInfo.user.userType,
    };

    const formData = new FormData();
    if (fileData.value) formData.append("file", fileData.value);
    formData.append("text", new Blob([JSON.stringify(textData)], { type: "application/json" }));
    const res=await axios.post(Qna.SaveQnaDetail, formData);
    return res.data;
};