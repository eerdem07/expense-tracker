import express from "express";
const Router = express.Router();

import { getMe, updatePreferenes, updateProfile } from "./user.controller";

Router.route("/me").get(getMe).patch(updateProfile);
Router.route("/me/preferences").patch(updatePreferenes);

export default Router;

// Şifre sıfırla
// isim değiştir
// locale, timezone, baseCurrency değiştir
