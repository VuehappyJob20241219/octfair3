import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { mypageWithDrawApi } from "../../../api/mypage/mypageWithDrawApi";
import { useModalStore } from "../../../stores/modalState";
import { useUserInfo } from "../../../stores/userInfo";

export const useMypageWithDrawMutation = (pw) => {
  const router = useRouter();
  const modalState = useModalStore();
  const userInfo = useUserInfo();

  return useMutation({
    mutationFn: () => mypageWithDrawApi(pw),
    mutationKey: ["withDraw"],
    onSettled: (data, error) => {
      if (data.result === "success") {
        alert("탈퇴 되었습니다.\n지금까지 서비스를 이용해주셔서 감사합니다.");
        userInfo.setAuthenticated();
        modalState.setModalState();
        sessionStorage.setItem("userInfo", "");
        router.push("/");
      } else {
        alert("비밀번호를 확인해주세요.");
      }
    },
  });
};
