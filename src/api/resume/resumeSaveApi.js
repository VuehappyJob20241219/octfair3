import axios from "axios";
import { Resume } from "../axiosApi/resumeApi";

export const resumeSaveApi = async (basicinformation, user, fileData) => {
  const text = {
    loginId: user.loginId,
    userNm: user.userNm,
    userType: user.userType,
    res_title: basicinformation.value.resTitle,
    short_intro: basicinformation.value.shortIntro,
    pfo_link: basicinformation.value.proLink,
    per_statement: basicinformation.value.perStatement,
    resIdx: basicinformation.value.resIdx,
  };
  const formData = new FormData();
  if (fileData.value) {
    formData.append("file", fileData.value);
  }
  formData.append(
    "text",
    new Blob([JSON.stringify(text)], {
      type: "application/json",
    })
  );
  const result = await axios.post(Resume.SaveResume, formData);
  return result.data;
};
