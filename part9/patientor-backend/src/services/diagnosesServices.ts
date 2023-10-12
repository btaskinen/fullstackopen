import data from '../../data/diagnoses.ts';

import { Diagnosis } from '../types.ts';

const getDiagnoses = (): Diagnosis[] => {
  return data;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses,
};
