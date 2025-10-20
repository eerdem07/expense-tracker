import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
dotenv.config();

import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

import authRouter from "./modules/auth/auth.router";

const app: Application = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "API is running!" });
});

app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
