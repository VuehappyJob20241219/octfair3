import { useQuery } from '@tanstack/vue-query';
import { qnaListGetApi } from '../../api/qna/qnaListGetApi';

export const useQnaListGetQuery = (injectedSearchValue, cPage, itemPerPage) => {
    return useQuery({
        queryKey: ['qnaList', injectedSearchValue, cPage], 
        queryFn: () => qnaListGetApi(injectedSearchValue, cPage, itemPerPage), // callback() 효과
        // staleTime: 1000 * 60, // 캐시유지 주기
        // refetchInterval: 1000, // 자동갱신 주기
    });
};