import { useQuery } from "@tanstack/vue-query";
import { resumeUpdateInfoApi } from "../../../api/resume/resumeUpdateInfoApi";

export const useResumeUdateInfoUsequery = (idx) => {
  return useQuery({
    queryKey: ["resumeUpdateInfo", idx],
    queryFn: async () => {
      return await resumeUpdateInfoApi(idx);
    },
  });
};
