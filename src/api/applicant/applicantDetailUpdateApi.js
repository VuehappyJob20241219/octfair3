import axios from "axios";
import { checkInput } from "../../common/checkInput";
import { Applicant } from "../axiosApi/applicantApi";

export const applicantDetailUpdateApi = async (applicantDetailValue) => {
  if (!checkForm(applicantDetailValue)) {
    return;
  }

  const param = new URLSearchParams({
    ...applicantDetailValue.value,
  });

  return await axios.post(Applicant.ApplicantDetailUpdate, param);
};

const checkForm = (applicantDetailValue) => {
  const inputFields = {
    inputName: applicantDetailValue.value.name,
    inputBirthday: applicantDetailValue.value.birthday,
    inputPhone: applicantDetailValue.value.phone,
    inputEmail: applicantDetailValue.value.email,
    inputRegDate: applicantDetailValue.value.regdate,
    inputZipCode: applicantDetailValue.value.zipCode,
  };

  if (!checkInput(inputFields)) {
    return false;
  }

  return true;
};
