import axios from "axios";
import { Scrap } from "../axiosApi/scrapApi";

export const scrapSaveApi = async (postIdx) => {

    const result = await axios.post(Scrap.ScrapSave, { postIdx }, {
      headers: {
          'Content-Type': 'application/json',
      },
    });
};
