import { useMutation } from "@tanstack/vue-query";
import { mypagePwUpdateApi } from "../../../api/mypage/mypagePwUpdateApi";
import { useModalStore } from "../../../stores/modalState";

export const useMypagePwUpdateMutation = (userInfo, inputPw) => {
  const modalStatePw = useModalStore();

  return useMutation({
    mutationKey: ["updatePw"],
    mutationFn: () => mypagePwUpdateApi(userInfo, inputPw),
    onSettled: (data, error) => {
      if (data.result === "success") {
        alert("비밀번호를 변경하였습니다.");
        modalStatePw.setModalState();
      } else if (data.result === "fail1") {
        alert("입력하신 현재 비밀번호가 올바르지 않습니다. 다시 확인해주세요.");
      } else if (data.result === "fail2") {
        alert(
          "새 비밀번호와 확인용 비밀번호가 일치하지 않습니다. 다시 입력해주세요."
        );
      }
    },
  });
};
