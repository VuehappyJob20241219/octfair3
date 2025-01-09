import axios from "axios";
import { Company } from "../axiosApi/companyApi";

export const companyUpdateSearchApi = async (loginId) => {
  const result = await axios.post(Company.SearchCompanyUpdateDetail, loginId);
  return result.data;
};
