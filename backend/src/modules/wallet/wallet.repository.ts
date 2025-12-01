import { prisma } from "../../db/prisma";

export function create(data: {
  name: string;
  type: "cash" | "bank" | "credit";
  currency: string;
  openingBalance: number;
  userId: string;
}) {
  return prisma.wallet.create({
    data: {
      name: data.name,
      currency: data.currency,
      type: data.type,
      openingBalance: data.openingBalance,
      userId: data.userId,
    },
  });
}

export function findWallets(userId: string) {
  return prisma.wallet.findMany({
    where: {
      userId: userId,
    },
  });
}

export function findWallet(id: string) {
  return prisma.wallet.findUnique({
    where: {
      id,
    },
  });
}

export function update(
  id: string,
  data: {
    name: string;
    type: "cash" | "bank" | "credit";
    currency: string;
    openingBalance: number;
    userId: string;
  }
) {
  return prisma.wallet.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      currency: data.currency,
      type: data.type,
      openingBalance: data.openingBalance,
      userId: data.userId,
    },
  });
}

export async function toggleArchiveWallet(walletId: string, userId: string) {
  return prisma.$transaction(async (tx) => {
    const wallet = await tx.wallet.findFirstOrThrow({
      where: { id: walletId, userId: userId },
    });

    return tx.wallet.update({
      where: { id: walletId },
      data: { archived: !wallet.archived },
    });
  });
}
