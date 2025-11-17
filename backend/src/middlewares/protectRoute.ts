import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token";
import { AppError } from "../utils/AppError";

export default function protectRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    if (!accessToken) {
      throw new AppError("UNAUTHORIZED", 401);
    }
    const decoded = verifyAccessToken(accessToken);

    if (typeof decoded === "string" || !("id" in decoded)) {
      throw new AppError("FORBIDDEN", 403);
    }

    req.user = { id: decoded.id };

    next();
  } catch (err) {
    next(err);
  }
}
