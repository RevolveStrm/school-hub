declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			DATABASE_URL: string;
			SERVER_PORT: string;
			SERVER_ORIGIN: string;
			ACCESS_TOKEN_SECRET: string;
			ACCESS_TOKEN_EXPIRES_IN: string;
			REFRESH_TOKEN_SECRET: string;
			REFRESH_TOKEN_EXPIRES_IN: string;
			MAIL_HOST: string;
			MAIL_PORT: string;
			MAIL_AUTH_USER: string;
			MAIL_AUTH_PASS: string;
		}
	}
}

export {};
