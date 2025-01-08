import { useMutation } from "@tanstack/vue-query";
import { findInfoPwApi } from "../../../api/login/findMyInfoPwApi";

export const useFindMyInfoPwMutation = (findInfoPw, setPw) => {
  return useMutation({
    mutationKey: ["findMyPw"],
    mutationFn: () => findInfoPwApi(findInfoPw),
    onSettled: (data, error) => {
      if (data.result === "SUCCESS") {
        setPw.value.id = findInfoPw.value.regiId;
        findInfoPw.value.state = false;
        setPw.value.state = true;
      } else if (data) {
        alert("해당 정보로 찾으시는 PW가 존재하지 않습니다.");
      }
    },
  });
};
