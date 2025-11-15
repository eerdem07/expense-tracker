import { prisma } from "../../db/prisma";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserMany(email: string) {
  return prisma.user.findMany({
    where: { email },
  });
}

export async function create(data: {
  email: string;
  passwordHash: string;
  name: string;
}) {
  return prisma.user.create({
    data: {
      email: data.email,
      passwordHash: data.passwordHash,
      name: data.name,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });
}

export async function update(
  email: string,
  newData: {
    name: string;
  }
) {
  return prisma.user.update({
    where: { email },
    data: {
      name: newData.name,
    },
  });
}

export async function remove(email: string) {
  return prisma.user.delete({
    where: {
      email: email,
    },
  });
}
