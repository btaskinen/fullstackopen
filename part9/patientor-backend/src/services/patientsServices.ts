import data from '../../data/patients.ts';
import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return data;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...entry,
  };
  data.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
