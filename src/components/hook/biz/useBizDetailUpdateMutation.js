import { useMutation } from "@tanstack/vue-query";
import { bizDetailUpdateApi } from "../../../api/biz/bizDetailUpdateApi";
import { useModalStore } from "../../../stores/modalState";

export const useBizDetailUpdateMutation = (bizDetailValue, emit) => {
  const modalStateBiz = useModalStore();

  return useMutation({
    mutationKey: ["bizUpdate"],
    mutationFn: () => bizDetailUpdateApi(bizDetailValue),
    onSettled: (data, error) => {
      if (data) {
        modalStateBiz.setModalState();
        emit("postSuccess");
      }
    },
  });
};
