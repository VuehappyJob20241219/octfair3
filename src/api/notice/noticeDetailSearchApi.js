import axios from "axios";
import { Notice } from "../axiosApi/noticeApi";

export const noticeDetailSearchApi = async (idx) => { 
  console.log(idx);
  const respone = await axios.post(Notice.SearchNoticeDetail, { noticeSeq : idx });
  if (
       noticeDetail.value.fileExt === "jpg" ||
      noticeDetail.value.fileExt === "gif" ||
      noticeDetail.value.fileExt === "png" ||
      noticeDetail.value.fileExt === "webp"
    ) {
      getFileImage(idx);
      }
  
  return respone.data;
};

const getFileImage = () => {
  let param = new URLSearchParams();
  param.append("noticeSeq", idx);
  const postAction = {
    url: Notice.NoticeImageDownload,
    method: "POST",
    data: param,
    responseType: "blob",
  };
  axios(postAction).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const imageUrl=ref('');
    imageUrl.value = url;
    console.log(res);
  });
};