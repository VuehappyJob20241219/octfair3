import axios from "axios";
import { History } from "../axiosApi/historyApi";

export const historyCancleApi = async (appId) => {
    await axios.post(History.HistoryCancle, {appId}, {
      headers: {
          'Content-Type': 'application/json',
      },
    });
};
