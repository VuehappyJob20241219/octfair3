import axios from 'axios';
import { Qna } from '../api';

export const qnaListGetApi = async (injectedSearchValue, cPage, itemPerPage) => {
    const param = new URLSearchParams({
        ...injectedSearchValue.value,
        searchStDate: injectedSearchValue.value.searchStartDate || '',
        searchEdDate: injectedSearchValue.value.searchEndDate || '',
        currentPage: cPage.value,
        pageSize: itemPerPage.value,
    });

    const result = await axios.post(Qna.GetQnaList, param);
    return result.data;
};