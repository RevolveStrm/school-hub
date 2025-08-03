import z from "zod";

export const userSignInSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(8, { error: "Password should contain at least 8 symbols" }),
  })
  .describe("userSignInSchema");

export const userSignUpSchema = z.object({
  email: z.email(),
  username: z
    .string()
    .min(1, { error: "Username should contain at least 1 symbol" }),
  password: z
    .string()
    .min(8, { error: "Password should contain at least 8 symbols" }),
});
