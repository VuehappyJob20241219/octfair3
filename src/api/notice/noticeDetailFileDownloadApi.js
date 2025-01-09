import axios from "axios";
import { Notice } from "../axiosApi/noticeApi";

export const noticeDetailFileDownload = async (idx, fileName) => {
    let param = new URLSearchParams();
    param.append("noticeSeq", idx);
    const postAction = {
      url: Notice.NoticeImageDownload,
      method: "POST",
      data: param,
      responseType: "blob",
    };
    const respone = await axios(postAction);
    const url = window.URL.createObjectURL(new Blob([respone.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();    
  };