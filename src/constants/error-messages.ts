export enum ErrorMessages {
  INVALID_CREDENTIALS = 'Email or password is incorrect.',
  UNAUTHORIZED = 'You are not authorized to access this resource.',
  FORBIDDEN = 'You do not have permission to perform this action.',
  TOKEN_EXPIRED = 'Your session has expired. Please log in again.',
  TOKEN_INVALID = 'Invalid authentication token.',

  REQUIRED_FIELD = 'This field is required.',
  INVALID_EMAIL = 'Please enter a valid email address.',
  PASSWORD_TOO_SHORT = 'Password must be at least 8 characters long.',
  PASSWORDS_DO_NOT_MATCH = 'Passwords do not match.',
  INVALID_FORMAT = 'Invalid format.',
  STRING_TOO_LONG = 'This field exceeds the maximum allowed length.',
  VALUE_NOT_ALLOWED = 'This value is not allowed.',

  EMAIL_EXISTS = 'An account with this email already exists.',
  USER_NOT_FOUND = 'User not found.',
  USER_NOT_CREATED = 'User not created.',
  PROFILE_INCOMPLETE = 'User profile is incomplete.',

  RESOURCE_NOT_FOUND = 'Requested resource was not found.',
  RESOURCE_CONFLICT = 'This resource already exists.',
  RESOURCE_GONE = 'This resource is no longer available.',

  INTERNAL_SERVER_ERROR = 'An internal server error occurred.',
  SERVICE_UNAVAILABLE = 'The service is currently unavailable. Please try again later.',

  TOO_MANY_REQUESTS = 'Too many requests. Please try again later.',

  FILE_TOO_LARGE = 'The uploaded file is too large.',
  UNSUPPORTED_FILE_TYPE = 'Unsupported file type.'
}
