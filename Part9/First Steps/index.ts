import express from 'express';
import bodyParser from 'body-parser';
import { parseBmiArgs, bmiCalculator } from './bmiCaclulator';
import { parseExerciseArgs, calculateExercises } from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!weight || !height) {
    res.status(400).send({ error: 'missing parameters weight or height' });
  } else {
    try {
      const { value1Weight, value2Height } = parseBmiArgs(height, weight);
      const bmiResult = bmiCalculator(value1Weight, value2Height);
      res.json({ bmiResult });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
});

app.post('/exerciseCalculator', (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'missing parameters weight or height' });
  } else {
    try {
      const { value1Target, value2ArrOfDailyExerciseHr } = parseExerciseArgs(
        daily_exercises,
        target
      );

      const exerciseResults = calculateExercises(
        value1Target,
        value2ArrOfDailyExerciseHr
      );

      res.json({ exerciseResults });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
