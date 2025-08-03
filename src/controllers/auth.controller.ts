import * as bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";
import type { Request, Response } from "express";

import * as userService from "../services/users.service";
import * as authService from "../services/auth.service";
import { ErrorMessages } from "../constants/error-messages";
import { StatusCodes } from "../constants/status-codes";
import { asyncHandler } from "../utils/async-handler";
import { HttpError } from "../error/HttpError";

export const authLogIn = asyncHandler(async (req: Request, res: Response): Promise<unknown> => {
  const { email, password }: Pick<User, "email" | "password"> = req.body;

  const foundUser: User | null = await userService.getUserByEmail(email);

  if (!foundUser) {
    throw new HttpError(ErrorMessages.INVALID_CREDENTIALS, StatusCodes.BAD_REQUEST);
  }

  if (!await bcrypt.compare(password, foundUser.password)) {
    throw new HttpError(ErrorMessages.INVALID_CREDENTIALS, StatusCodes.BAD_REQUEST);
  }

  const payload: JwtPayload = authService.createJWTPayload(foundUser);

  const { accessToken, refreshToken } = authService.createTokens(payload);

  setRefreshTokenCookie(res, refreshToken);

  return res.status(StatusCodes.OK).json({
    accessToken
  });
});

export const authSignUp = asyncHandler(async (req: Request, res: Response): Promise<unknown> => {
  const { username, email, password }: Pick<User, "username" | "email" | "password"> = req.body;

  const foundUser = await userService.getUserByEmail(email);

  if (foundUser) {
    throw new HttpError(ErrorMessages.EMAIL_EXISTS, StatusCodes.BAD_REQUEST);
  }

  const hashedPassword: string = await authService.getHashedPassword(password);

  const createdUser: User = await userService.createUser(username, email, hashedPassword);
    
  if (!createdUser) {
    throw new HttpError(ErrorMessages.USER_NOT_CREATED, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  const payload: JwtPayload = authService.createJWTPayload(createdUser);

  const { accessToken, refreshToken } = authService.createTokens(payload);

  setRefreshTokenCookie(res, refreshToken);

  return sendAuthTokens(res, StatusCodes.CREATED, { accessToken, refreshToken });
});

export const authRefresh = asyncHandler(async (req: Request, res: Response): Promise<unknown> => {
  if (!req.headers.cookie) {
    throw new HttpError(ErrorMessages.FORBIDDEN, StatusCodes.UNAUTHORIZED);
  }

  const refreshToken = req.cookies?.refresh_token as string;

  if (!refreshToken) {
    throw new HttpError(ErrorMessages.FORBIDDEN, StatusCodes.UNAUTHORIZED);
  }

  const verifiedPayload: JwtPayload = authService.verifyToken(refreshToken, "refresh");

  const foundUser = await userService.getUserByEmail(verifiedPayload.email);

  if (!foundUser) {
    throw new HttpError(ErrorMessages.FORBIDDEN, StatusCodes.UNAUTHORIZED);
  }

  const createdPayload: JwtPayload = authService.createJWTPayload(foundUser);

  const { accessToken } = authService.createTokens(createdPayload);

  return sendAuthTokens(res, StatusCodes.OK, { accessToken });
});

export const authLogOut = asyncHandler(async (_req: Request, res: Response): Promise<unknown> => {
  res.clearCookie('refresh_token', {
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "production"
  });

  return res.status(StatusCodes.OK).json({
    success: true
  });
});

const setRefreshTokenCookie = (res: Response, token: string): void => {
  res.cookie('refresh_token', token, {
    maxAge: 604800000,
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "production"
  });
}

const sendAuthTokens = (res: Response, code: StatusCodes, tokens: Record<string, string>): unknown => {
  return res.status(code).json(tokens);
}