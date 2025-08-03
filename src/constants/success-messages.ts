export enum SuccessMessages {
  // ──────────────── AUTH ────────────────
  LOGIN_SUCCESS = "You have successfully logged in.",
  LOGOUT_SUCCESS = "You have successfully logged out.",
  REGISTRATION_SUCCESS = "Your account has been created successfully.",
  EMAIL_CONFIRMED = "Your email has been successfully confirmed.",
  PASSWORD_RESET_EMAIL_SENT = "Password reset instructions have been sent to your email.",
  PASSWORD_RESET_SUCCESS = "Your password has been reset successfully.",
  PASSWORD_CHANGED = "Your password has been changed.",
  TOKEN_REFRESHED = "Token has been refreshed successfully.",

  // ──────────────── USER ────────────────
  PROFILE_UPDATED = "Your profile has been updated.",
  USER_CREATED = "User has been created successfully.",
  USER_DELETED = "User has been deleted successfully.",
  USER_VERIFIED = "User has been verified.",
  SETTINGS_UPDATED = "Your settings have been saved.",

  // ──────────────── RESOURCE ────────────────
  RESOURCE_CREATED = "The resource has been created successfully.",
  RESOURCE_UPDATED = "The resource has been updated successfully.",
  RESOURCE_DELETED = "The resource has been deleted.",
  RESOURCE_FETCHED = "Resource fetched successfully.",
  RESOURCE_RESTORED = "The resource has been restored.",
  RESOURCE_ARCHIVED = "The resource has been archived.",

  // ──────────────── FILE UPLOAD ────────────────
  FILE_UPLOADED = "File has been uploaded successfully.",
  FILE_DELETED = "File has been deleted.",
  FILE_REPLACED = "File has been replaced.",
  AVATAR_UPDATED = "Your avatar has been updated.",

  // ──────────────── NOTIFICATIONS / EMAILS ────────────────
  EMAIL_SENT = "Email has been sent successfully.",
  INVITE_SENT = "Invitation has been sent.",
  NOTIFICATION_SENT = "Notification delivered successfully.",
  SUBSCRIPTION_CONFIRMED = "You have successfully subscribed.",

  // ──────────────── GENERAL / MISC ────────────────
  ACTION_SUCCESSFUL = "Action completed successfully.",
  CHANGES_SAVED = "Changes have been saved.",
  REQUEST_SUCCESSFUL = "Request completed successfully.",
  OPERATION_SUCCESSFUL = "Operation completed successfully.",
  SYSTEM_READY = "System is up and running.",
}
