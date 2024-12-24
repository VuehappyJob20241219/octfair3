import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { useModalStore } from '@/stores/modalState';

export const useQnaImageGetMutation = (detailValue, idx, fileData, imageUrl) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const modalStore = useModalStore();

    const selectQnaFile = async (e) => {
        const fileInfo = e.target.files;
        const fileInfoSplit = fileInfo[0].name.split('.');
        const fileExtension = fileInfoSplit[1].toLowerCase();
    
        if (['jpg', 'gif', 'png', 'webp'].includes(fileExtension))
            imageUrl.value = URL.createObjectURL(fileInfo[0]);
        fileData.value = fileInfo[0];
    }

    return useMutation({
        mutationKey: ['qnaFile'],
        mutationFn: selectQnaFile,
    });
};