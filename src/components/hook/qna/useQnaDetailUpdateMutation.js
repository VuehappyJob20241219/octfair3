import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { qnaDetailUpdateApi } from '../../api/qna/qnaDetailUpdateApi';

export const useQnaDetailUpdateMutation = (detailValue, idx, fileData) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationKey: ['qnaUpdate'],
        mutationFn: () => qnaDetailUpdateApi(detailValue, idx, fileData),
        onSuccess: () => {
            router.go(-1);
            queryClient.invalidateQueries({ // 'noticeList'란 key로 NoticeMain에 있는 useQuery를 가동시켜 list 새로고침
                queryKey: ['qnaList']
            });
        },
    });
};