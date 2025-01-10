import axios from 'axios';
import { Resume } from '../axiosApi/resumeApi';

export const resumeUpdateInfoApi = async (idx) => {
    const numericIdx = Number(idx);
    const result = await axios.post(Resume.MyResume, { resIdx: numericIdx });
    return result.data.result;
};
