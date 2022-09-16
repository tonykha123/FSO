import express from 'express';
const cors = require('cors');
const app = express();

//parser middleware
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here at /ping');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
