import { useQuery } from "@tanstack/vue-query";
import { mypageDetailApi } from "../../../api/mypage/mypageDetailApi";

export const useMypageDetailQuery = (userInfo) => {
  return useQuery({
    queryKey: ["userDetail"],
    queryFn: () => mypageDetailApi(userInfo),
    enabled: !!userInfo.user.loginId,
  });
};
