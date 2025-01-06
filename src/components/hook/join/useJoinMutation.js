import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { joinUserApi } from "../../../api/join/joinUserApi";

export const useJoinMutation = (checkId, register) => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => joinUserApi(checkId, register),
    mutationKey: ["joinUser"],
    onSettled: (data, error) => {
      if (data.result === "SUCCESS") {
        alert("회원 가입에 성공했습니다.");
        router.push("/");
      }
    },
  });
};
