declare global {
	namespace Jsonwebtoken {
		interface JwtPayload {
			id: string;
			email: string;
			username: string;
			role: Role;
		}
	}
}
