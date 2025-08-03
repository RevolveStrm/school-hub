import { Router } from "express";
import { validateData } from "../middlewares/validate-data.middleware";
import { userSignInSchema, userSignUpSchema } from "../schemas/user.schema";
import { AuthRoutes } from "../constants/routes";
import * as authControllers from "../controllers/auth.controller";

export const coursesRouter = Router();

// coursesRouter.post(AuthRoutes.LOG_IN, validateData(userSignInSchema), authControllers.authLogIn);
