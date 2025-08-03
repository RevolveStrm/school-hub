import z from "zod";

export const uuidSchema = z.uuid();

export const authResetPasswordSchema = z.object({
  email: z.email(),
});
