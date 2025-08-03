import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { asyncHandler } from "../utils/async-handler";

export const validateData = (schema: ZodType) =>
  asyncHandler(async (req: Request, _: Response, next: NextFunction) => {
    await schema.parseAsync(req.body);

    return next();
  });
