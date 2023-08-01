import express from 'express';
import db from './config/db.config';
import ringRouter from './routes/ring.route';

db.sync().then(() => {
  console.log('connect to db');
});

const app = express();

const port = 3001;

app.use(express.json());

app.use('/api/v1', ringRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
