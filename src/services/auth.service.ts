import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import ms from "ms";

export const createJWTPayload = (user: User): JwtPayload => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role
  }
}

export const getHashedPassword = async (password: string): Promise<string> => {
  const saltRounds: number = 10;
  const generatedSalt: string = await bcrypt.genSalt(saltRounds);
  
  return await bcrypt.hash(password, generatedSalt);
}

export const createTokens = (payload: JwtPayload): { accessToken: string, refreshToken: string } => {
  const accessToken: string = sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as ms.StringValue
  });
  const refreshToken: string = sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue
  });

  return ({
    accessToken,
    refreshToken
  })
}

export const verifyToken = (token: string, type: "access" | "refresh"): JwtPayload => {
  const secret = type === "access" ?
    process.env.ACCESS_TOKEN_SECRET :
    process.env.REFRESH_TOKEN_SECRET;

  return verify(token, secret) as JwtPayload;
}