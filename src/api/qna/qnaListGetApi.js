import axios from 'axios';
import { Qna } from '../axiosApi/qnaApi';

export const qnaListGetApi = async (route, activeButton, cPage, 
    itemPerPage, loginId, injectedhRequestType) => {
    const param = {
        searchTitle: route.query.searchTitle || "",
        searchStDate: route.query.searchStDate || "",
        searchEdDate: route.query.searchEdDate || "",
        qna_type: activeButton.value, // 활성 버튼 값 포함
        currentPage: cPage.value.toString(),
        pageSize: itemPerPage.value.toString(),
        loginId: loginId,
        requestType: injectedhRequestType.requestType || "all", // 프로바이더 값 사용
      };

    const result = await axios.post(Qna.GetQnaList, param);
    return result.data;
};