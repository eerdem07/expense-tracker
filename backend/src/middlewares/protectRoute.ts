import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/token';
import { AppError } from '../utils/AppError';

export default function protectRoute(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if (!accessToken) {
      throw new AppError('UNAUTHORIZED', 401);
    }
    const decoded = verifyAccessToken(accessToken);

    if (
      !decoded ||
      typeof decoded !== 'object' ||
      !('id' in decoded) ||
      typeof (decoded as any).id !== 'string'
    ) {
      throw new AppError('FORBIDDEN', 403);
    }

    req.user = { id: decoded.id };

    next();
  } catch (err) {
    next(err);
  }
}
