import { type ConfirmationToken, ConfirmationTokenType } from "@prisma/client";
import { prisma } from "../database/database";

export const createToken = async (
	confirmationCode: string,
	userId: string,
): Promise<ConfirmationToken> => {
	const expiresAt: Date = new Date(Date.now() + 86400000);

	return await prisma.confirmationToken.create({
		data: {
			expiresAt,
			userId,
			token: confirmationCode,
			type: ConfirmationTokenType.CONFIRM_EMAIL,
		},
	});
};
