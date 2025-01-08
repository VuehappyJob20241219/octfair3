import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { insertApply } from "../../../api/apply/applyInsertApi";
import { useModalStore } from "@/stores/modalState";

export const useApplyInsertMutation = ({ postIdx, loginId },resumeIdx) => {
  const modalState = useModalStore();
  return useMutation({
    mutationFn: () => insertApply(postIdx,resumeIdx.value, loginId),
    mutationKey: ["applySave"],
    onSuccess: (data, variables) => {
      console.log(data);
      if (data.data.result === "success") {      
        alert("이력서가 지원 완료되었습니다.");
        modalState.setModalState();
      }else if (data.data.result === "fail"){
          alert("이미 지원 완료된 공고입니다.");
      }      
    },
  });
};
