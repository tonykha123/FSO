import express from 'express';
import patientServices from '../Services/patientServices';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientServices.getPatientNoSSN());
});

export default router;
