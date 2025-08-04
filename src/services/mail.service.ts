import emailConfirmationHTML from "../nodemailer/templates/email-confirmation";
import emailResetHTML from "../nodemailer/templates/email-reset";
import transporter from "../nodemailer/transporter";

export const sendConfirmationMail = async (
	email: string,
	username: string,
	confirmationCode: string,
): Promise<void> => {
	const confirmationUrl: string = `${process.env.MAIL_CONFIRMATION_URL}${confirmationCode}`;

	const html: string = emailConfirmationHTML({ username, confirmationUrl });

	await transporter.sendMail({
		from: process.env.MAIL_FROM,
		to: email,
		html,
	});
};

export const sendPasswordResetMail = async (
	email: string,
	username: string,
	password: string,
): Promise<void> => {
	const html: string = emailResetHTML({
		username,
		password,
	});

	await transporter.sendMail({
		from: process.env.MAIL_FROM,
		to: email,
		html,
	});
};
