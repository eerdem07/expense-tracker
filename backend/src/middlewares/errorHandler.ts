import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // Eğer header'lar zaten gönderildiyse default handler’a bırak
  if (res.headersSent) {
    return;
  }

  const statusCode =
    (typeof err.status === "number" && err.status) ||
    (typeof err.statusCode === "number" && err.statusCode) ||
    500;

  const isProd = process.env.NODE_ENV === "production";

  const response: Record<string, any> = {
    status: statusCode < 500 ? "fail" : "error",
    message: err.message || "Internal Server Error",
  };

  if (!isProd) {
    response.stack = err.stack;
    response.details = err.details ?? undefined;
  }

  console.error("[ERROR]:", err);
  res.status(statusCode).json(response);
}
