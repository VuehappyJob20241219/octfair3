import axios from "axios";
import { Scrap } from "../axiosApi/scrapApi";

export const scrapSaveApi = async (postIdx) => {

    const res = await axios.post(Scrap.ScrapSave, { postIdx }, {
      headers: {
          'Content-Type': 'application/json',
      },
    });
  
  if (res.data.result === 'fail') {
    //이미 등록된 스크랩일 경우 fail
    alert("이미 등록된 스크랩입니다");
    return false;
  }
  return true;
};
