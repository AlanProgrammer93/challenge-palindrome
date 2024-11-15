import cors from 'cors';
import express, { json } from 'express';

const app = express();
app.use(cors());
app.use(json());

/**
 * Routes for the challenge
 */

// GET /
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});