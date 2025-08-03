import { Router } from "express";
import { validateData } from "../middlewares/validate-data.middleware";
import { userSignInSchema, userSignUpSchema } from "../schemas/user.schema";
import { AuthRoutes } from "../constants/routes";
import * as authControllers from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post(AuthRoutes.LOG_IN, validateData(userSignInSchema), authControllers.authLogIn);

authRouter.get(AuthRoutes.LOG_OUT, authControllers.authLogOut);

authRouter.post(AuthRoutes.SIGN_UP, validateData(userSignUpSchema), authControllers.authSignUp);

authRouter.post(AuthRoutes.REFRESH, authControllers.authRefresh);