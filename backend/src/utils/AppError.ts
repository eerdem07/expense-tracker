import { iso } from "zod";

export class AppError extends Error {
  statusCode: number;
  isOperational?: boolean;

  constructor(message: string, statusCode = 500, isOperational?: boolean) {
    super(message);
    this.statusCode = statusCode;

    if (typeof isOperational === "boolean") {
      this.isOperational === true;
    } else {
      this.isOperational = statusCode.toString().startsWith("4");
    }

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = new.target.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
}
