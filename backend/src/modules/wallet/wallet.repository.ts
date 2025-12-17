import { prisma } from '../../db/prisma';
import { addWalletDtoType } from './wallet.dto';

export function create(userId: string, data: addWalletDtoType) {
  return prisma.wallet.create({
    data: {
      name: data.name,
      currency: data.currency,
      type: data.type,
      openingBalance: data.openingBalance,
      userId: userId,
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
  walletId: string,
  userId: string,
  data: addWalletDtoType
) {
  return prisma.wallet.update({
    where: {
      id: walletId,
    },
    data: {
      name: data.name,
      currency: data.currency,
      type: data.type,
      openingBalance: data.openingBalance,
      userId: userId,
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
