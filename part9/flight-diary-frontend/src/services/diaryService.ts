import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3004/api/diaries';

export const getAllDiaryEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

export const createDiaryEntry = (object: NewDiaryEntry) => {
  console.log('calling create diary entry function');
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then((response) => response.data)
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data;
        }
        return error.message;
      } else {
        return error;
      }
    });
};
