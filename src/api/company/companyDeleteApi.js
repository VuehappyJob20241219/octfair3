import axios from "axios";
import { Company } from "../axiosApi/companyApi";

export const companyDeleteApi = async (loginId) => {
  const result = await axios.post(Company.DeleteCompany, loginId);
  return result.data;
};
