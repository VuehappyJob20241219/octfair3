import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { qnaDetailUpdateApi } from '../../../api/qna/qnaDetailUpdateApi';

export const useQnaDetailUpdateMutation = (qnaDetail,fileData,emits,props) => {
    return useMutation({
        mutationKey: ['qnaUpdate'],
        mutationFn: () => qnaDetailUpdateApi(qnaDetail,fileData,props),
        onSuccess: (data) => {
            if (data.result.toUpperCase() === "SUCCESS") {
                emits("close");
                alert("수정 성공했습니다.");
              } else {
                alert("수정 실패했습니다.");
              }
        },
    });
};