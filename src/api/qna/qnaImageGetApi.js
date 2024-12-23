import axios from 'axios';
import { Qna } from '../api';

export const qnaImageGetApi = async (imageUrl, idx) => {
    let param = new URLSearchParams();
    param.append('QnaSeq', idx);
    const postAction = {
        url: Qna.GetQnaImage,
        method: 'POST',
        data: param,
        responseType: 'blob',
    };

    await axios(postAction)
        .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            imageUrl.value = url;
        }
    );
};