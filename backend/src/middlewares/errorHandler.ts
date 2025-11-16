import { Request, Response, NextFunction } from "express";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";

import { AppError } from "../utils/AppError";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  // 1) JWT hataları
  if (err instanceof TokenExpiredError) {
    err = new AppError("REFRESH_TOKEN_EXPIRED", 401);
  } else if (err instanceof NotBeforeError) {
    err = new AppError("REFRESH_TOKEN_NOT_ACTIVE", 401);
  } else if (err instanceof JsonWebTokenError) {
    err = new AppError("REFRESH_TOKEN_INVALID", 401);
  }

  // 2) AppError ise operationa/non-operational
  if (err instanceof AppError) {
    const isProd = process.env.NODE_ENV === "production";

    const response: Record<string, any> = {
      status: false,
      message: err.message,
    };

    if (!isProd) {
      response.stack = err.stack;
    }

    if (err.isOperational) {
      return res.status(err.statusCode).json(response);
    }

    console.error("[NON-OPERATIONAL AppError]:", err);

    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }

  // 3) Diğer tüm beklenmeyen hatalar
  const statusCode =
    (typeof err.statusCode === "number" && err.statusCode) || 500;

  const isProd = process.env.NODE_ENV === "production";

  const response: Record<string, any> = {
    status: false,
    message:
      statusCode === 500 && isProd
        ? "Internal Server Error"
        : err.message || "Internal Server Error",
  };

  if (!isProd) {
    response.stack = err.stack;
  }

  console.error("[ERROR]:", err);
  return res.status(statusCode).json(response);
}
