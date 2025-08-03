import { ErrorMessages } from "src/constants/error-messages";
import { StatusCodes } from "src/constants/status-codes";

export class HttpError extends Error {
  code: number | StatusCodes;

  constructor(message: string | ErrorMessages, code: number | StatusCodes = 500) {
    super(message);
    this.code = code;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}