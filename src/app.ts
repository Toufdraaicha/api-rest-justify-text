import express from 'express';
import auth from './routes/auth';
import justificationRoutes from './routes/justificationRoutes';
const port = process.env.PORT; 

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(express.text());

app.use('/api', auth); // Authentication routes
app.use('/api', justificationRoutes); 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
