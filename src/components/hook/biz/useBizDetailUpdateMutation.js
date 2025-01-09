import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { bizDetailUpdateApi } from "../../../api/biz/bizDetailUpdateApi";
import { useModalStore } from "../../../stores/modalState";

export const useBizDetailUpdateMutation = (bizDetailValue, emit) => {
  const modalStateBiz = useModalStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["bizUpdate"],
    mutationFn: () => bizDetailUpdateApi(bizDetailValue),
    onSettled: (data, error) => {
      if (data) {
        modalStateBiz.setModalState();
        queryClient.removeQueries({
          queryKey: ["bizList"],
        });
        emit("postSuccess");
      }
    },
  });
};
