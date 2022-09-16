import express from 'express';
import cors from 'cors';
const app = express();
import diagnosesRouter from './Routes/diagnoses';

//parser middleware
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use('/api/diagnoses', diagnosesRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here at /ping');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
