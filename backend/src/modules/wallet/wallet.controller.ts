import { Request, Response, NextFunction } from "express";

export function createWallet(req: Request, res: Response, next: NextFunction) {
  // TODO: middleware üzerinden kullanıcının id'sini al.
  const userId = req.user?.id;
  // TODO: req.body üzerinden veriyi al
}

export function getWallets(req: Request, res: Response, next: NextFunction) {
  // TODO: kullanıcının id'sini jwt üzerinden al
  // TODO: kullanıcının id'si üzerinden walletları bul
}

export function getWallet(req: Request, res: Response, next: NextFunction) {
  // TODO: query üzerinden gelen id'yi al
  // TODO: eğer bir number değilse hata dön.
  // TODO: belirtilen id ile wallet bul ve dön
}

export function updateWallet(req: Request, res: Response, next: NextFunction) {
  // TODO:
}

export function archiveWallet(
  req: Request,
  res: Response,
  next: NextFunction
) {}
