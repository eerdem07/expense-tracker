import { prisma } from '../../db/prisma';
import { UserPrefsDtoType } from './user.dto';

export function findUser(userId: string) {
  return prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    omit: {
      passwordHash: true,
    },
  });
}

export function update(userId: string, data: UserPrefsDtoType) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      locale: data.locale,
      timezone: data.timezone,
      baseCurrency: data.baseCurrency,
    },
    omit: {
      passwordHash: true,
    },
  });
}
