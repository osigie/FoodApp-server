import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./CustomApi";

export class UnauthorizedRequest extends CustomApiError {
  constructor(message: string, status: number = StatusCodes.UNAUTHORIZED) {
    super(message, status);
    this.message = message;
    this.status = status;
  }
}
