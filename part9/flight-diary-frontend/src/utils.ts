import { DiaryEntry } from './types';

export const isDiaryEntry = (value: unknown): value is DiaryEntry => {
  return (
    (value as DiaryEntry).date !== undefined &&
    (value as DiaryEntry).weather !== undefined &&
    (value as DiaryEntry).visibility !== undefined
  );
};
