import axios from 'axios';
import { useUserInfo } from '../../stores/userInfo';
import { Qna } from '../axiosApi/qnaApi';

export const qnaDetailUpdateApi = async (qnaDetail,fileData,props) => {
    const userInfo = useUserInfo();
    const textData = {
        qnaTit: qnaDetail.value.title,
        qnaCon: qnaDetail.value.content,
        loginId: userInfo.user.loginId,
        qnaSeq: qnaDetail.value.qnaIdx,
        password: props.password,
        ans_content: qnaDetail.value.ans_content,
    };

    const formData = new FormData();
    if (fileData.value) formData.append("file", fileData.value);
    formData.append("text", new Blob([JSON.stringify(textData)], { type: "application/json" }));
    
    const res = await axios.post(Qna.UpdateQnaDetail, formData);
    return res.data;
};