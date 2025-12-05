import { prisma } from "../../db/prisma";

export function create(newData: {
  name: string;
  type: "income" | "expense";
  userId: string;
  parentId: string;
}) {
  return prisma.category.create({
    data: {
      name: newData.name,
      type: newData.type,
      userId: newData.userId,
      parentId: newData.parentId,
    },
  });
}

export function update(newData: {
  name: string;
  type: "income" | "expense";
  userId: string;
  parentId: string;
}) {
  // return prisma.category.update();
}

export function findCategoryByParentId(parentId: string, userId: string) {
  return prisma.category.findFirstOrThrow({
    where: {
      userId,
      parentId,
    },
  });
}

export function findCategoryById() {}

export function findCategories() {}
