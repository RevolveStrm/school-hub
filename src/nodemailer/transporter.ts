import nodemailer, { type Transporter } from "nodemailer";

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.NODE_ENV === "production",
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASS,
  },
});

export default transporter;
