import { useMutation } from "@tanstack/vue-query";
import { mypageDetailUpdateApi } from "../../../api/mypage/mypageDetailUpdateApi";

export const useMypageDetailUpdateMutation = (userDetailValue) => {
  return useMutation({
    mutationKey: ["userInfoUpdate"],
    mutationFn: () => mypageDetailUpdateApi(userDetailValue),
    onSettled: (data, error) => {
      console.log(data.data);
      if (data.data.result === "success") {
        alert("정보를 수정하였습니다.");
      }
    },
  });
};
