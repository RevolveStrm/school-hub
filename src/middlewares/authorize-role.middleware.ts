import type { Role } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { ErrorMessages } from "../constants/error-messages";
import { StatusCodes } from "../constants/status-codes";
import { HttpError } from "../error/HttpError";
import { asyncHandler } from "../utils/async-handler";

export const authorizeRoles = (allowedRoles: Role[]) =>
	asyncHandler(
		async (
			req: Request,
			_res: Response,
			next: NextFunction,
		): Promise<unknown> => {
			console.log(req?.user);
			if (!req?.user || !allowedRoles?.includes(req.user?.role)) {
				throw new HttpError(
					ErrorMessages.UNAUTHORIZED,
					StatusCodes.UNAUTHORIZED,
				);
			}

			return next();
		},
	);
