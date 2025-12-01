import express from "express";
const Router = express.Router();

import {
  getCategories,
  addCategory,
  getCategoryById,
  updateCategory,
  archiveCategory,
} from "./category.controller";

Router.route("/").get(getCategories).post(addCategory);
Router.route("/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(archiveCategory);

export default Router;
