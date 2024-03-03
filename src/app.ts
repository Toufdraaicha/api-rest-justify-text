import express from 'express';
import auth from './routes/auth';

const port = process.env.PORT; 

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', auth);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
