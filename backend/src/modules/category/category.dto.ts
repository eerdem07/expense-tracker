import z from "zod";

const categoryTypeEnum = z.enum(["INCOME", "EXPENSE"]);

export const createCategoryDto = z.object({
  name: z.string().min(1).max(50),
  type: categoryTypeEnum,
  parentId: z.cuid().optional().nullable(),
});

export const updateCategoryDto = createCategoryDto.partial();
