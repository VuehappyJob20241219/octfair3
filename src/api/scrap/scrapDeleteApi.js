import axios from "axios";
import { Scrap } from "../axiosApi/scrapApi";

export const scrapDeleteApi = async ({scrapIndexes}) => {
    console.log("삭제 데이터===============================", { scrapIndexes } );
    await axios.post(Scrap.ScrapDelete, {scrapIndexes}, {
      headers: {
          'Content-Type': 'application/json',
      },
    });
};
