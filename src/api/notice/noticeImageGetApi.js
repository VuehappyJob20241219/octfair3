import axios from "axios";
import { Notice } from "../axiosApi/noticeApi";

export const noticeImageGetApi = async (idx) => {    
    let param = new URLSearchParams();
    param.append("noticeSeq", idx);    
    const postAction = {
        url: Notice.NoticeImageDownload,
        method: 'POST',
        data: param,
        responseType: 'blob',
    };    
    const respone = await axios(postAction);
    const url = window.URL.createObjectURL(new Blob([respone.data]));    
    return url;    
}