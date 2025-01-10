import { useQuery } from '@tanstack/vue-query';
import { resumeBaseInfoApi } from '../../../api/resume/resumeBaseInfoApi';
import { useUserInfo } from '../../../stores/userInfo';

export const useResumeBaseInfoQuery = (idx) => {
    const userInfo = useUserInfo();
    const { user } = userInfo;
    const userParam = {
        loginId: user.loginId,
        userNm: user.userNm,
        userType: user.userType,
    };
    return useQuery({
        queryKey: ['resumeBaseInfo'],
        queryFn: () => resumeBaseInfoApi(userParam), // API 호출
        enabled: !idx,
    });
};
