import express from "express";
const Router = express.Router();

import { loginController, signUpController } from "./auth.controller";

Router.post("/login", loginController);
Router.post("/signup", signUpController);

export default Router;
