export enum ErrorMessages {
	// ──────────────── AUTH ────────────────
	INVALID_CREDENTIALS = "Email or password is incorrect.",
	UNAUTHORIZED = "You are not authorized to access this resource.",
	FORBIDDEN = "You do not have permission to perform this action.",
	TOKEN_EXPIRED = "Your session has expired. Please log in again.",
	TOKEN_INVALID = "Invalid authentication token.",
	TOKEN_NOT_EXIST = "Confirmation token does not exist.",
	TOKEN_ALREADY_USED = "This token has already been used.",
	TOKEN_EXPIRED_OR_INVALID = "Confirmation token is invalid or has expired.",
	EMAIL_NOT_VERIFIED = "Your email address has not been verified.",
	SESSION_EXPIRED = "Your session has expired. Please log in again.",
	ACCOUNT_INACTIVE = "Your account is inactive or has been disabled.",
	ACCOUNT_LOCKED = "Your account is locked due to too many failed login attempts.",

	// ──────────────── VALIDATION ────────────────
	REQUIRED_FIELD = "This field is required.",
	INVALID_EMAIL = "Please enter a valid email address.",
	PASSWORD_TOO_SHORT = "Password must be at least 8 characters long.",
	PASSWORD_TOO_WEAK = "Password must include numbers, symbols, and capital letters.",
	PASSWORDS_DO_NOT_MATCH = "Passwords do not match.",
	INVALID_FORMAT = "Invalid format.",
	STRING_TOO_LONG = "This field exceeds the maximum allowed length.",
	VALUE_NOT_ALLOWED = "This value is not allowed.",
	INVALID_DATE = "Invalid date format.",
	FIELD_MUST_BE_NUMBER = "This field must be a number.",
	FIELD_MUST_BE_BOOLEAN = "This field must be true or false.",
	FIELD_MUST_BE_STRING = "This field must be a string.",

	// ──────────────── PASSWORD / RESET FLOW ────────────────
	PASSWORD_RESET_TOKEN_INVALID = "Invalid or expired password reset token.",
	PASSWORD_RESET_FAILED = "Failed to reset password.",
	PASSWORD_SAME_AS_OLD = "New password must be different from the old password.",
	PASSWORD_CHANGE_NOT_ALLOWED = "Password change is not allowed at this time.",
	PASSWORD_UPDATE_FAILED = "Unable to update password.",
	PASSWORD_CONFIRMATION_MISSING = "Please confirm your new password.",

	// ──────────────── EMAIL CONFIRMATION / TOKENS ────────────────
	CONFIRMATION_TOKEN_INVALID = "Invalid confirmation token.",
	CONFIRMATION_TOKEN_EXPIRED = "Confirmation token has expired.",
	CONFIRMATION_ALREADY_PROCESSED = "This confirmation has already been processed.",
	EMAIL_CONFIRMATION_REQUIRED = "Please confirm your email to proceed.",
	EMAIL_CONFIRMATION_FAILED = "Failed to confirm email.",
	EMAIL_CONFIRMATION_EXPIRED = "Confirmation link has expired.",
	RESEND_CONFIRMATION_COOLDOWN = "You must wait before requesting another confirmation email.",

	// ──────────────── USER ────────────────
	EMAIL_EXISTS = "An account with this email already exists.",
	USER_NOT_FOUND = "User not found.",
	USER_NOT_CREATED = "User not created.",
	PROFILE_INCOMPLETE = "User profile is incomplete.",
	EMAIL_ALREADY_VERIFIED = "Email is already verified.",
	CANNOT_DELETE_ADMIN = "You cannot delete an admin user.",

	// ──────────────── RESOURCE ────────────────
	RESOURCE_NOT_FOUND = "Requested resource was not found.",
	RESOURCE_CONFLICT = "This resource already exists.",
	RESOURCE_GONE = "This resource is no longer available.",
	RESOURCE_LOCKED = "This resource is currently locked.",
	RESOURCE_LIMIT_REACHED = "Resource limit has been reached.",
	CANNOT_MODIFY_RESOURCE = "You are not allowed to modify this resource.",

	// ──────────────── SERVER ────────────────
	INTERNAL_SERVER_ERROR = "An internal server error occurred.",
	SERVICE_UNAVAILABLE = "The service is currently unavailable. Please try again later.",
	DATABASE_ERROR = "Database error occurred.",
	CONFIGURATION_ERROR = "Server configuration error.",

	// ──────────────── RATE LIMITING ────────────────
	TOO_MANY_REQUESTS = "Too many requests. Please try again later.",
	RATE_LIMIT_EXCEEDED = "You have exceeded the allowed number of requests.",

	// ──────────────── FILE UPLOAD ────────────────
	FILE_TOO_LARGE = "The uploaded file is too large.",
	UNSUPPORTED_FILE_TYPE = "Unsupported file type.",
	FILE_UPLOAD_FAILED = "File upload failed.",
	FILE_REQUIRED = "A file must be uploaded.",

	// ──────────────── SYSTEM / MISC ────────────────
	UNKNOWN_ERROR = "An unknown error has occurred.",
	FEATURE_DISABLED = "This feature is currently disabled.",
	ACTION_NOT_ALLOWED = "This action is not allowed.",
	INVALID_OPERATION = "Invalid operation.",
}
