// External imports
import './loadEnv.js';
import express, { Request, Response } from 'express';
import cors from 'cors';

// Local imports
import indexRouter from './routes/indexRouter.js';

// Initialize app
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.ALLOWED_ORIGIN,
  }),
);
app.use(express.json());

// App route
app.use(indexRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('server is live');
});

// Initialize server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('server started');
});
