import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodType } from "zod";

export const validate =
  (schema: ZodType): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    const r = schema.safeParse(req.body);
    if (!r.success)
      return res.status(422).json({
        status: false,
        message: "Validation error",
        errors: r.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      });
    req.body = r.data;
    next();
  };
