import type { User } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { ErrorMessages } from "../constants/error-messages";
import { StatusCodes } from "../constants/status-codes";
import { HttpError } from "../error/HttpError";
import * as authService from "../services/auth.service";
import * as userService from "../services/users.service";
import { asyncHandler } from "../utils/async-handler";

export const checkAuth = asyncHandler(
  async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<unknown> => {
    const authorizationHeader = req.headers?.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
      throw new HttpError(ErrorMessages.TOKEN_INVALID, StatusCodes.BAD_REQUEST);
    }

    const [type, token] = authorizationHeader?.split(" ") ?? [];

    if (type !== "Bearer" || !token?.length) {
      throw new HttpError(
        ErrorMessages.TOKEN_INVALID,
        StatusCodes.UNAUTHORIZED,
      );
    }

    const decoded: JwtPayload = authService.verifyToken(token, "access");
    const user: User | null = await userService.getUserByEmail(decoded.email);

    if (!user) {
      throw new HttpError(ErrorMessages.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    req.user = user;
    return next();
  },
);
