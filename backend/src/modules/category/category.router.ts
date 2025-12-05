import express from "express";
import { validate } from "../../middlewares/validate";
const Router = express.Router();

import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  archiveCategory,
} from "./category.controller";

Router.route("/").get(getCategories).post(validate, createCategory);
Router.route("/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(archiveCategory);

export default Router;
