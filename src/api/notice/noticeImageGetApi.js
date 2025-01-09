import { Notice } from "../axiosApi/noticeApi";

export const noticeImageGetApi = async (idx) => {
    console.log("이미지api")
    let param = new URLSearchParams();
    param.append('NoticeSeq', idx);
    const postAction = {
        url: Notice.NoticeImageDownload,
        method: 'POST',
        data: param,
        responseType: 'blob',
    };    
    const respone = await axios(postAction);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    return url;    
}