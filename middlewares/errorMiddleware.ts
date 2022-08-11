import { StatusCodes } from "http-status-codes";
import { Response, Request, NextFunction } from "express";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let defaultError = {
    statusCode: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong",
  };
  console.log("error",defaultError);
  res.status(defaultError.statusCode).json({ message: defaultError.msg });
};
