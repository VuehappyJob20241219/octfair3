import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { qnaImageGetApi } from '../../../api/qna/qnaImageGetApi';

export const useQnaImageGetMutation = (idx,qnaDetail) => {
    return useMutation({
        mutationKey: ['qnaFile'],
        mutationFn: () => qnaImageGetApi(idx,qnaDetail), 
        // onSuccess: (link) => {
        //     // link가 반환된 후, 다운로드를 트리거
            
        // },
        onError: (error) => {
            console.error("Error downloading file:", error);
        }       
    });
};