import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from 'cookie-parser';

import { checkAuth } from "../middlewares/check-auth.middleware";
import { authRouter } from "../routes/auth.route";
import { allowedHeaders } from "../constants/allowed-headers";
import { Routes } from "../constants/routes";
import { errorHandler } from "../middlewares/error-handler.middleware";

export const app = express();

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(cors({
  origin: process.env.SERVER_ORIGIN,
  allowedHeaders: allowedHeaders
}));

app.use(helmet({
  hidePoweredBy: true
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
	limit: 1000,
	standardHeaders: 'draft-8',
	legacyHeaders: false
}));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(Routes.AUTH, authRouter);

app.use(errorHandler);