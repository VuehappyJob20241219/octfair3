import axios from 'axios';
import { Qna } from '../api';

export const qnaDetailUpdateApi = async (detailValue, idx, fileData) => {
    const textData = {
        ...detailValue.value, // title
        context: detailValue.value.content, // 변수명 오타 차이
        qnaSeq: idx,
    };

    const formData = new FormData();
    if(fileData.value)
        formData.append('file', fileData.value);
    formData.append('text', new Blob([JSON.stringify(textData)], {type:'application/json'}));
    
    await axios.post(Qna.UpdateQnaDetail, formData);
};