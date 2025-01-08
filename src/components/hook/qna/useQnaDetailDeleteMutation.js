import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { qnaDetailDeleteApi } from '../../../api/qna/qnaDetailDeleteApi';


export const useQnaDetailDeleteMutation = (idx,emits) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['qnaDelete'],
        mutationFn: () => qnaDetailDeleteApi(idx),
        onSuccess: (data) => {
            console.log(data.result);            
            if (data.result == "success") {                
                alert("성공적으로 삭제되었습니다.");
                emits("close");
              } else {
                alert("삭제를 실패했습니다.");
              }
        },
    });
};