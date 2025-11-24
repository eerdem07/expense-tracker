import { prisma } from "../../db/prisma";

export function create(data: {
  name: string;
  type: ["cash", "bank", "credit"];
  currency: string;
  openingBalance: number;
}) {
  return prisma.wallet.create({
    data: {
      name: data.name,
      currency: data.currency,
      type: data.type,
      openingBalance: data.openingBalance,
    },
  });
}

export function getWallets(userId: string) {}

export function getWallet(id: string) {}

export function update(data: {}) {}

export function archiveWallet(id: string) {}
