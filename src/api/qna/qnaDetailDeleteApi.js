import axios from 'axios';
import { Qna } from '../api';

export const qnaDetailDeleteApi = async (detailValue, idx, fileData) => {
    await axios.post(Qna.DeleteQnaDetail, {qnaSeq : idx});
};