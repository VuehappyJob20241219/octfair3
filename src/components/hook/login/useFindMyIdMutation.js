import { useMutation } from "@tanstack/vue-query";
import { findMyIdApi } from "../../../api/login/findMyIdApi";

export const useFindMyIdMutation = (findId, myId) => {
  return useMutation({
    mutationKey: ["findMyId"],
    mutationFn: () => findMyIdApi(findId),
    onSettled: (data, error) => {
      if (data.result === "SUCCESS") {
        findId.value.state = false;
        myId.value.id = data.id;
        myId.value.state = true;
      } else if (data) {
        alert("해당 정보로 찾으시는 ID가 존재하지 않습니다.");
      }
    },
  });
};
