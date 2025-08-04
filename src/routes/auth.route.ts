import { Router } from "express";
import { AuthRoutes } from "../constants/routes";
import * as authControllers from "../controllers/auth.controller";
import { validateData } from "../middlewares/validate-data.middleware";
import { authResetPasswordSchema } from "../schemas/auth.schema";
import { userSignInSchema, userSignUpSchema } from "../schemas/user.schema";

export const authRouter = Router();

authRouter.post(
  AuthRoutes.LOG_IN,
  validateData(userSignInSchema),
  authControllers.authLogIn,
);

authRouter.post(
  AuthRoutes.SIGN_UP,
  validateData(userSignUpSchema),
  authControllers.authSignUp,
);

authRouter.post(
  AuthRoutes.RESET_PASSWORD,
  validateData(authResetPasswordSchema),
  authControllers.authResetPassword,
);

authRouter.get(AuthRoutes.LOG_OUT, authControllers.authLogOut);

authRouter.post(AuthRoutes.REFRESH, authControllers.authRefresh);

authRouter.get(AuthRoutes.CONFIRM_EMAIL, authControllers.authConfirmEmail);
