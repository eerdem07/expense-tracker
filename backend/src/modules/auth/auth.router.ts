import express from "express";
const Router = express.Router();
import { validate } from "../../middlewares/validate";
import { registerDto, loginDto } from "./auth.dto";

import {
  loginController,
  registerController,
  refreshTokenController,
} from "./auth.controller";

Router.post("/register", validate(registerDto), registerController);
Router.post("/login", validate(loginDto), loginController);
Router.post("/refreshToken", refreshTokenController);

export default Router;
