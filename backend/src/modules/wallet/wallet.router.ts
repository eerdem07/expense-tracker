import express from "express";
const Router = express.Router();
import {
  createWallet,
  getUniqueWallet,
  getUserWallets,
} from "./wallet.controller";
import { validate } from "../../middlewares/validate";
import protectRoute from "../../middlewares/protectRoute";
import { addWalletDto } from "./wallet.dto";

Router.route("/")
  .get(protectRoute, getUserWallets)
  .post(protectRoute, validate(addWalletDto), createWallet);
Router.route("/:id").get(getUniqueWallet);

// POST yeni cüzdan ekle
// GET kullanıcının tüm cüzdanları
// GET tek cüzdan detayı
// PUT cüzdan güncelle
// PATCH pasif et, arşive al
// silme genelde yapılmas

export default Router;
