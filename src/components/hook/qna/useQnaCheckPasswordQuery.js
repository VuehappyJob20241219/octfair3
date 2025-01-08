import { useQuery } from '@tanstack/vue-query';
import { qnaListGetApi } from '../../../api/qna/qnaListGetApi';

export const useQnaCheckPasswordQuery = (route, activeButton, cPage, itemPerPage, 
    loginId, injectedhRequestType, injectedSaveState, qnaLogState) => {
    return useQuery({
        queryKey: ['qnaPwCheckList', cPage, injectedhRequestType.requestType, injectedSaveState.saveState, qnaLogState], 
        queryFn: () => qnaListGetApi(route, activeButton, cPage, 
        itemPerPage, loginId, injectedhRequestType), // callback() 효과
        staleTime: 1000 * 60, // 캐시유지 주기
        // refetchInterval: 1000, // 자동갱신 주기
    });
};