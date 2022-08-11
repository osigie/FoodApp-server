import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./CustomApi";

export class NotFound extends CustomApiError {
  constructor(message: string, status: number = StatusCodes.NOT_FOUND) {
    super(message, status);
    this.message = message;
    this.status = status;
  }
}
