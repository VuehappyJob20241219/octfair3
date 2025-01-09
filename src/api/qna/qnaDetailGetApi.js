import axios from 'axios';
import { Qna } from '../axiosApi/qnaApi';

export const qnaDetailGetApi = async (props,userInfo) => {
    const param = {
        qnaSeq: props.idx,
        password: props.password,
        userType: userInfo.user.userType,
      };
    const result = await axios.post(Qna.GetQnaDetail, param);
    return result.data.detail;
};