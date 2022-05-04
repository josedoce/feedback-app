import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const PORT: number = 3333 || process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, ()=>{
  console.info(`running on port ${PORT}`)
});