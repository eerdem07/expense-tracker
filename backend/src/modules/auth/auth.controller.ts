import { Request, Response, NextFunction } from "express";
import argon2 from "argon2";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../utils/token";
import { create, findUserByEmail } from "./auth.repository";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, name, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "User already exists.",
      });
    }

    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    const newUser = {
      email: email,
      passwordHash: hash,
      name: name,
    };

    await create(newUser);

    res.status(200).json({
      status: true,
      message: "User created",
    });
  } catch (err) {
    return next(err);
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (!existingUser || !existingUser.passwordHash) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password.",
      });
    }

    const status = await argon2.verify(existingUser.passwordHash, password);

    if (!status) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password.",
      });
    }

    const accessToken = signAccessToken({
      id: existingUser.id,
    });

    const refreshToken = signRefreshToken({
      id: existingUser.id,
    });

    res.cookie("refreshToken", refreshToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      status: true,
      message: "Login successful.",
      data: {
        accessToken,
      },
    });
  } catch (err) {
    return next(err);
  }
}

export async function refreshTokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      status: false,
      code: "REFRESH_TOKEN_MISSING",
      message: "Refresh token yok.",
    });
  }

  try {
    const decodedToken = verifyRefreshToken(refreshToken) as {
      id: string;
    };

    const accessToken = signAccessToken({
      id: decodedToken.id,
    });

    return res.status(200).json({
      status: true,
      message: "Login successful.",
      data: {
        token: accessToken,
      },
    });
  } catch (err) {
    // TODO: refresh token geçerli değilse hata gönder.
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        status: false,
        message: "REFRESH_TOKEN_EXPIRED",
      });
    }

    if (err instanceof NotBeforeError) {
      return res.status(401).json({
        status: false,
        message: "REFRESH_TOKEN_NOT_ACTIVE",
      });
    }

    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({
        status: false,
        message: "REFRESH_TOKEN_INVALID",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Failed to validate refresh token.",
    });
  }
}
