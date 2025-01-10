import { useQuery } from '@tanstack/vue-query';
import { resumeUpdateInfoApi } from '../../../api/resume/resumeUpdateInfoApi';

export const useResumeUpdateQuery = (idx) => {
    return useQuery({
        queryKey: ['resumeUdateInfo', idx],
        queryFn: () => resumeUpdateInfoApi(idx),
        enabled: !!idx,
    });
};
