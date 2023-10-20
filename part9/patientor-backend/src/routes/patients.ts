import express from 'express';
import patientsServices from '../services/patientsServices';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsServices.getPatients());
});

router.get('/:id', (req, res) => {
  try {
    const patientID = req.params.id;
    const patients = patientsServices.getPatients();
    const queriedPatient = patients.find((patient) => patient.id === patientID);
    if (!queriedPatient) {
      throw new Error('Patient not found.');
    }
    console.log(queriedPatient);
    return res.status(200).send(queriedPatient);
  } catch (error) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
      return res.status(404).send(errorMessage);
    } else {
      errorMessage = 'Something went wrong';
      return res.status(400).send(errorMessage);
    }
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsServices.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
