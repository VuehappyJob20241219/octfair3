import axios from 'axios';
import { Qna } from '../axiosApi/qnaApi';


export const qnaImageGetApi = async (idx, qnaDetail) => {
    let param = new URLSearchParams();
    param.append('qnaSeq', idx);

    const postAction = {
        url: Qna.GetQnaImage,
        method: 'POST',
        data: param,
        responseType: 'blob',
    };

    try {
        // axios 요청을 기다리고
        const res = await axios(postAction);  // 비동기 처리로 요청을 기다림
        const url = window.URL.createObjectURL(new Blob([res.data]));  // Blob을 URL로 생성

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", qnaDetail.value.fileName);  // 파일 이름 설정
        document.body.appendChild(link);  // link를 DOM에 추가
        link.click();  // 파일 다운로드 시작
        link.remove();  // 다운로드 후 link를 DOM에서 제거
        // return link;  // link 반환
    } catch (error) {
        console.error("Error fetching image:", error);
        throw error;  // 오류 발생 시 던져서 catch에서 처리할 수 있게 함
    }
};