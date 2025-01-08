import { useQuery } from '@tanstack/vue-query';
import { qnaDetailGetApi } from '../../../api/qna/qnaDetailGetApi';

export const useQnaDetailGetQuery = (props,userInfo) => {
    return useQuery({
        // enabled는 key가 아니라 활성여부임에도 true값으로 활성된때 초기 1번은 실행됨, 
        // so 유사key처럼 작동하기도 함 
        // '!!'는 null/false -> false로 치환해주는 로직
        // enabled: !!idx,
        queryKey: ['qnaDetail'],
        queryFn: () => qnaDetailGetApi(props,userInfo),
    });
};
