export const generateConfirmationToken = () => {
	return crypto.randomUUID();
};
