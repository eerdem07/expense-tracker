import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { create, findCategoryByParentId } from "./category.repository";

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, type, parentId } = req.body;
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError("UserId isnt valid", 400);
    }

    if (parentId) {
      const existCategory = await findCategoryByParentId(parentId, userId);
      if (!existCategory) throw new AppError("parentId incorrect", 400);
      //   - Parent başka bir kullanıcıya aitse 403 döndür.
    }

    const newCategory = {
      name,
      type,
      userId,
      parentId,
    };

    const category = await create(newCategory);

    res.status(201).json({
      status: true,
      message: "CATEGORY_CREATED",
      data: {
        category,
      },
    });
  } catch (err: any) {
    if (err.code === "P2002") {
      return next(new AppError("CATEGORY NAME EXISTS", 400));
    }
    next(err);
  }
}

export function getCategories(req: Request, res: Response, next: NextFunction) {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError("userId isnt valid", 400);
  }
}

export function getCategoryById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // userId al, queryId al
  // veriyi çek
  // dön
}

export function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // dtodan veriyi al
  // userId al
  // güncelle
  // geriye dön
}

export function archiveCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // userId ve query id al
  // repositore istek alıp veriyi güncelle
  // olumul mesajı dön
}
