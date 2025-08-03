import { ConfirmationTokenType, type User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { generate } from "generate-password";
import type { JwtPayload } from "jsonwebtoken";
import { ErrorMessages } from "../constants/error-messages";
import { StatusCodes } from "../constants/status-codes";
import { SuccessMessages } from "../constants/success-messages";
import { prisma } from "../database/database";
import { HttpError } from "../error/HttpError";
import emailConfirmationHTML from "../nodemailer/templates/email-confirmation";
import emailResetHTML from "../nodemailer/templates/email-reset";
import transporter from "../nodemailer/transporter";
import { uuidSchema } from "../schemas/auth.schema";
import * as authService from "../services/auth.service";
import * as userService from "../services/users.service";
import { asyncHandler } from "../utils/async-handler";
import { generateConfirmationToken } from "../utils/confirmation-code";

export const authLogIn = asyncHandler(
  async (req: Request, res: Response): Promise<unknown> => {
    const { email, password }: Pick<User, "email" | "password"> = req.body;

    const foundUser: User | null = await userService.getUserByEmail(email);

    if (!foundUser) {
      throw new HttpError(
        ErrorMessages.INVALID_CREDENTIALS,
        StatusCodes.BAD_REQUEST,
      );
    }

    if (!(await bcrypt.compare(password, foundUser.password))) {
      throw new HttpError(
        ErrorMessages.INVALID_CREDENTIALS,
        StatusCodes.BAD_REQUEST,
      );
    }

    const payload: JwtPayload = authService.createJWTPayload(foundUser);

    const { accessToken, refreshToken } = authService.createTokens(payload);

    setRefreshTokenCookie(res, refreshToken);

    return res.status(StatusCodes.OK).json({
      accessToken,
    });
  },
);

export const authSignUp = asyncHandler(
  async (req: Request, res: Response): Promise<unknown> => {
    const {
      username,
      email,
      password,
    }: Pick<User, "username" | "email" | "password"> = req.body;

    const foundUser = await userService.getUserByEmail(email);

    if (foundUser) {
      throw new HttpError(ErrorMessages.EMAIL_EXISTS, StatusCodes.BAD_REQUEST);
    }

    const hashedPassword: string =
      await authService.getHashedPassword(password);

    const createdUser: User = await userService.createUser(
      username,
      email,
      hashedPassword,
    );

    if (!createdUser) {
      throw new HttpError(
        ErrorMessages.USER_NOT_CREATED,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    const confirmationCode: string = generateConfirmationToken();

    const confirmationUrl: string = `http://localhost:3000/auth/confirm-email/${confirmationCode}`;

    const html: string = emailConfirmationHTML({ username, confirmationUrl });

    await prisma.confirmationToken.create({
      data: {
        expiresAt: new Date(Date.now() + 86400000),
        token: confirmationCode,
        type: ConfirmationTokenType.CONFIRM_EMAIL,
        user: {
          connect: createdUser,
        },
      },
    });

    await transporter.sendMail({
      from: "test@mail",
      to: email,
      html,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "Confirm your email" });
  },
);

export const authRefresh = asyncHandler(
  async (req: Request, res: Response): Promise<unknown> => {
    if (!req.headers.cookie) {
      throw new HttpError(ErrorMessages.FORBIDDEN, StatusCodes.UNAUTHORIZED);
    }

    const refreshToken = req.cookies?.refresh_token as string;

    if (!refreshToken) {
      throw new HttpError(ErrorMessages.FORBIDDEN, StatusCodes.UNAUTHORIZED);
    }

    const verifiedPayload: JwtPayload = authService.verifyToken(
      refreshToken,
      "refresh",
    );

    const foundUser = await userService.getUserByEmail(verifiedPayload.email);

    if (!foundUser) {
      throw new HttpError(ErrorMessages.FORBIDDEN, StatusCodes.UNAUTHORIZED);
    }

    const createdPayload: JwtPayload = authService.createJWTPayload(foundUser);

    const { accessToken } = authService.createTokens(createdPayload);

    return sendAuthTokens(res, StatusCodes.OK, { accessToken });
  },
);

export const authLogOut = asyncHandler(
  async (_req: Request, res: Response): Promise<unknown> => {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(StatusCodes.OK).json({
      success: true,
    });
  },
);

export const authConfirmEmail = asyncHandler(
  async (req: Request, res: Response): Promise<unknown> => {
    const { token } = req.params;

    if (!token) {
      throw new HttpError(
        ErrorMessages.TOKEN_EXPIRED_OR_INVALID,
        StatusCodes.BAD_REQUEST,
      );
    }
    await uuidSchema.parseAsync(token);

    const foundToken = await authService.findUniqueConfirmationToken(token);

    if (!foundToken) {
      throw new HttpError(
        ErrorMessages.TOKEN_NOT_EXIST,
        StatusCodes.BAD_REQUEST,
      );
    }

    if (
      foundToken.isExpired ||
      foundToken.type !== ConfirmationTokenType.CONFIRM_EMAIL
    ) {
      throw new HttpError(
        ErrorMessages.TOKEN_EXPIRED_OR_INVALID,
        StatusCodes.BAD_REQUEST,
      );
    }

    await userService.confirmUserEmail(foundToken.userId);

    await authService.deactivateConfirmationToken(foundToken.token);

    return res.status(StatusCodes.OK).json({ success: true });
  },
);

export const authResetPassword = asyncHandler(
  async (req: Request, res: Response): Promise<unknown> => {
    const { email } = req.body;

    const generatedPassword: string = generate({
      length: 16,
    });

    const hashedPassword: string =
      await authService.getHashedPassword(generatedPassword);

    const foundUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (foundUser) {
      await prisma.user.update({
        where: {
          id: foundUser.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      const html: string = emailResetHTML({
        username: foundUser.username,
        password: generatedPassword,
      });

      await transporter.sendMail({
        from: "test@mail",
        to: email,
        html,
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: SuccessMessages.PASSWORD_RESET_EMAIL_SENT,
    });
  },
);

const setRefreshTokenCookie = (res: Response, token: string): void => {
  res.cookie("refresh_token", token, {
    maxAge: 604800000,
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
  });
};

const sendAuthTokens = (
  res: Response,
  code: StatusCodes,
  tokens: Record<string, string>,
): unknown => {
  return res.status(code).json(tokens);
};
