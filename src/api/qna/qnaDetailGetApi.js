import axios from 'axios';
import { Qna } from '../api';

export const qnaDetailGetApi = async (detailValue, idx, fileData) => {
    const result = await axios.post(Qna.GetNoticeDetail, {qnaSeq : idx});
    return result.data;
};