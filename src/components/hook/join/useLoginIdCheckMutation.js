import { useMutation } from "@tanstack/vue-query";
import { loginIdCheckApi } from "../../../api/join/loginIdCheckApi";

export const useLoginIdCheckMutation = (checkId, register) => {
  return useMutation({
    mutationFn: () => loginIdCheckApi(register),
    mutationKey: ["loginIdCheck"],
    onSettled: (data, error) => {
      if (data === 0) {
        checkId.value = true;
        alert("사용할 수 있는 아이디 입니다.");
      } else {
        alert("중복된 아이디가 존재합니다.");
      }
    },
  });
};
