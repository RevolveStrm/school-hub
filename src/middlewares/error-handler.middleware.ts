import { Request, Response, NextFunction } from "express";
import { ErrorMessages } from "../constants/error-messages";
import { StatusCodes } from "../constants/status-codes";
import { HttpError } from "../error/HttpError";
import z, { ZodError } from "zod";

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  let code: number | StatusCodes = 500;
  let message: string | ErrorMessages = ErrorMessages.INTERNAL_SERVER_ERROR;

  if (err instanceof HttpError) {

    code = err.code;
    message = err.message;
  } else if (err instanceof ZodError) {

    code = StatusCodes.BAD_REQUEST;
    message = parseZodError(err);
  } else if (err instanceof Error) {

    message = err.message;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(code).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && {
      stack: (err as Error).stack
    })
  })
}

const parseZodError = (zodError: ZodError): string => {
  let error: string = "";
  Object.entries(z.flattenError(zodError).fieldErrors).forEach((fieldError) => {
    error += `[${fieldError[0]}] - ${fieldError[1]}; `
  });
  return error.trim();
}