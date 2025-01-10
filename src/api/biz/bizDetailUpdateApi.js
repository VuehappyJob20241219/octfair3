import axios from "axios";
import { checkInput } from "../../common/checkInput";
import { Biz } from "../axiosApi/bizApi";

export const bizDetailUpdateApi = async (bizDetailValue) => {
  if (!checkForm(bizDetailValue)) {
    return;
  }

  const param = new URLSearchParams({
    ...bizDetailValue.value,
  });

  return await axios.post(Biz.BizDetailUpdate, param);
};

const checkForm = (bizDetailValue) => {
  const inputFields = {
    inputBizName: bizDetailValue.value.bizName,
    inputContact: bizDetailValue.value.bizContact,
    inputBizFoundDate: bizDetailValue.value.bizFoundDate,
  };

  if (!checkInput(inputFields)) {
    return false;
  }

  return true;
};
