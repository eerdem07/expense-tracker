import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

import authRouter from './modules/auth/auth.router';
import walletRouter from './modules/wallet/wallet.router';
import meRouter from './modules/user/me.router';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running!' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/wallets', walletRouter);
app.use('/api/v1/me', meRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
