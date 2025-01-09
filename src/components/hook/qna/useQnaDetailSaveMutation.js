import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { qnaDetailSaveApi } from '../../../api/qna/qnaDetailSaveApi';

export const useQnaDetailSaveMutation = (qnaDetail,fileData,emits) => {
     return useMutation({
        mutationKey: ['qnaSave'],
        mutationFn: () => qnaDetailSaveApi(qnaDetail,fileData),
        onSuccess: (data) => {
            if (data.result.toUpperCase() === "SUCCESS") {
                alert("등록 성공했습니다.");
                emits("close");                
              } else {
                alert("등록 실패했습니다.");
              }
        },
    });
};