import axios from 'axios';
import { Qna } from '../axiosApi/qnaApi';

export const qnaDetailDeleteApi = async (idx) => {
    const res = await axios.post(Qna.DeleteQnaDetail, {qnaSeq : idx});
    return res.data;
    
};