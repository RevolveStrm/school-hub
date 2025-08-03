import Handlebars from "handlebars";
import templateSource from "./source";

interface EmailResetData {
	username: string;
	password: string;
}

export default function (
	data: EmailResetData,
	source: string = templateSource,
): string {
	const template = Handlebars.compile(source);

	return template(data);
}
