import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./CustomApi";

export class BadRequest extends CustomApiError {
  constructor(message: string, status: number = StatusCodes.BAD_REQUEST) {
    super(message, status);
    this.message = message;
    this.status = status;
  }
}
