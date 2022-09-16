import express from 'express';
import diagnosesService from '../Services/diagnosesService';
const router = express.Router();

router.get('/', (_req, res) => {
  const diagnosesData = diagnosesService.getDiagnoses();

  res.send(diagnosesData);
});

export default router;
