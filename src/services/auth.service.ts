import type { ConfirmationToken, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { type JwtPayload, sign, verify } from "jsonwebtoken";
import type ms from "ms";
import { prisma } from "../database/database";

export const findUniqueConfirmationToken = async (
  token: string,
): Promise<ConfirmationToken | null> => {
  return await prisma.confirmationToken.findUnique({
    where: {
      token,
    },
  });
};

export const deactivateConfirmationToken = async (
  token: string,
): Promise<void> => {
  await prisma.confirmationToken.update({
    data: {
      isExpired: true,
    },
    where: {
      token,
    },
  });
};

export const createJWTPayload = (user: User): JwtPayload => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
};

export const getHashedPassword = async (password: string): Promise<string> => {
  const saltRounds: number = 10;
  const generatedSalt: string = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(password, generatedSalt);
};

export const createTokens = (
  payload: JwtPayload,
): { accessToken: string; refreshToken: string } => {
  const accessToken: string = sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as ms.StringValue,
  });
  const refreshToken: string = sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const verifyToken = (
  token: string,
  type: "access" | "refresh",
): JwtPayload => {
  const secret =
    type === "access"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET;

  return verify(token, secret) as JwtPayload;
};
