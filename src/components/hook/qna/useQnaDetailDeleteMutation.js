import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { noticeDetailDeleteApi } from '../../api/notice/noticeDetailDeleteApi';
import { useRouter } from 'vue-router';

export const useQnaDetailDeleteMutation = (detailValue, idx, fileData) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationKey: ['noticeDelete'],
        mutationFn: () => noticeDetailDeleteApi(detailValue, idx, fileData),
        onSuccess: () => {
            router.go(-1);
            queryClient.invalidateQueries({ // 'noticeList'란 key로 NoticeMain에 있는 useQuery를 가동시켜 list 새로고침
                queryKey: ['noticeList']
            });
        },
    });
};