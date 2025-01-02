import axios from "axios";
import { Scrap } from "../axiosApi/scrapApi";

export const scrapSaveApi = async (postIdx) => {

    await axios.post(Scrap.ScrapSave, { postIdx }, {
      headers: {
          'Content-Type': 'application/json',
      },
  });




//   const result = await axios.post(Scrap.ScrapSave, param, {
//       headers: {
//           'Content-Type': 'application/json',
//       },
//   });

//  return result.data;
};
