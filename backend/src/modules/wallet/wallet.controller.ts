import { Request, Response, NextFunction } from "express";
import { findWallet, findWallets, create } from "./wallet.repository";
import { AppError } from "../../utils/AppError";

export async function createWallet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user || !req.user.id) {
      throw new AppError("userId is missing!", 401);
    }
    const userId = req.user.id;

    const walletObj = {
      name: req.body.name,
      type: req.body.type,
      currency: req.body.currency,
      openingBalance: req.body.openingBalance,
      userId: userId,
    };

    const newWallet = await create(walletObj);

    res.status(201).json({
      status: true,
      message: "",
      data: { newWallet },
    });
  } catch (err: any) {
    if (err.code === "P2002") {
      return next(new AppError("WALLET NAME EXISTS", 409));
    }
    next(err);
  }
}

export async function getUserWallets(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError("UserId isnt valid", 400);
    }

    const wallets = await findWallet(userId);

    res.status(200).json({
      status: true,
      data: {
        wallets,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getUniqueWallet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params["id"];

    if (!id) {
      throw new AppError("ID parametresi zorunlu", 400);
    }

    const wallet = await findWallet(id);

    res.status(200).json({
      status: true,
      message: "WALLET_FOUND",
      data: {
        wallet,
      },
    });
  } catch (err) {
    next(err);
  }
}

export function updateWallet(req: Request, res: Response, next: NextFunction) {}

export function archiveWallet(
  req: Request,
  res: Response,
  next: NextFunction
) {}
