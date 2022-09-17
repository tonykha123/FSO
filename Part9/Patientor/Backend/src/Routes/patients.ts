/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientServices from '../Services/patientServices';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientServices.getPatientNoSSN());
});

router.get('/:patientID', (req, res) => {
  const id = req.params.patientID;
  const foundPatient = patientServices.findPatientById(id);
  if (foundPatient) {
    res.send(foundPatient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const NewPatientEntry = toNewPatientEntry(req.body);
    const addedNewPatientEntry = patientServices.addPatient(NewPatientEntry);
    res.json(addedNewPatientEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
export default router;
