import express from 'express';
import patientServices from '../Services/patientServices';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

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
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const NewPatientEntry = patientServices.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  res.json(NewPatientEntry);
});

export default router;
