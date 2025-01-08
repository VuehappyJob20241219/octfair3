import { useMutation } from "@tanstack/vue-query";
import { setMyPwApi } from "../../../api/login/setMyPwApi";
import { useModalStore } from "../../../stores/modalState";

export const useSetMyPwMutation = (setPw) => {
  const modalState = useModalStore();

  return useMutation({
    mutationKey: ["updatePW"],
    mutationFn: () => setMyPwApi(setPw),
    onSettled: (data, error) => {
      if (data.result === "SUCCESS") {
        alert("비밀번호를 변경하였습니다.");
        modalState.setModalState();
      } else {
        alert("비밀번호 변경에 실패하였습니다.");
      }
    },
  });
};
