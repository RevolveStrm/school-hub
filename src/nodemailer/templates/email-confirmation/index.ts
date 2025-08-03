import Handlebars from "handlebars";
import templateSource from "./source";

interface EmailConfirmationData {
	username: string;
	confirmationUrl: string;
}

export default function (
	data: EmailConfirmationData,
	source: string = templateSource,
): string {
	const template = Handlebars.compile(source);

	return template(data);
}
