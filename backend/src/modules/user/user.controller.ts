import { Request, Response, NextFunction } from 'express';
import { findUser, update } from './user.repository';
import { AppError } from '../../utils/AppError';

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user || typeof req.user?.id !== 'string') {
      throw new AppError('userId is missing!', 401);
    }

    const userId = req.user.id;

    const user = await findUser(userId);

    res.status(200).json({
      status: true,
      message: 'user found',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function updatePreferenes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user || typeof req.user?.id !== 'string') {
      throw new AppError('userId is missing!', 401);
    }

    const userId = req.user.id;

    const prefObj = {
      locale: req.body.locale,
      timezone: req.body.timezone,
      baseCurrency: req.body.baseCurrency,
    };

    const newUser = await update(userId, prefObj);

    res.status(200).json({
      status: true,
      message: 'user updated',
      data: { newUser },
    });
  } catch (err) {
    next(err);
  }
}

export function updateProfile() {}
