import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AdminDb from "../models/admin";
const dotenv = require("dotenv").config();

const secret = process.env.JWT_SECRET as string;

interface Token {
  id: string;
}

export const protectRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from headers
      token = req.headers.authorization.split(" ")[1];

      //Verify token
      const decoded = jwt.verify(token, secret) as Token;

      //Get user from the token
      req.user = await AdminDb.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Not authorized" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized no token" });
  }
};

// ///Generate JWT token
