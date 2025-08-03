import type { Request, Response, NextFunction } from "express";
import { ErrorMessages } from "../constants/error-messages";
import { StatusCodes } from "../constants/status-codes";
import * as authService from "../services/auth.service";
import * as userService from "../services/users.service";
import { asyncHandler } from "../utils/async-handler";
import { HttpError } from "src/error/HttpError";
import { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";

export const checkAuth = asyncHandler(async (req: Request, _res: Response, next: NextFunction): Promise<unknown> => {
  const authorizationHeader = req.headers.authorization;

  const [type, token] = authorizationHeader?.split(" ") ?? [];

  if (type !== "Bearer" || !token?.length) {
    throw new HttpError(ErrorMessages.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
  }

  const decoded: JwtPayload = authService.verifyToken(token, "access");
  const user: User | null = await userService.getUserByEmail(decoded.email);

  if (!user) {
    throw new HttpError(ErrorMessages.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
  }

  req.user = user;
  return next();
});
