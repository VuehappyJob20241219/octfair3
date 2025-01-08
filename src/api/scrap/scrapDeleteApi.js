import axios from "axios";
import { Scrap } from "../axiosApi/scrapApi";

export const scrapDeleteApi = async ({scrapIndexes}) => {
    await axios.post(Scrap.ScrapDelete, {scrapIndexes}, {
      headers: {
          'Content-Type': 'application/json',
      },
    });
};
