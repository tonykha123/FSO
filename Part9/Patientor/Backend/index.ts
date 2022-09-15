import express from 'express';
const app = express();

//parser middleware
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here at /ping');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
