import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { NextFunction, Response } from "express";
dotenv.config();

const secret = process.env.JWT_SECRET as string;
//generate token
export const generateToken = (id: string) => {
  return jwt.sign({ id }, secret, { expiresIn: "5m" });
};

//generate refresh token
export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, secret, { expiresIn: "7d" });
};

//Hash Password
export const hashing = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

//compare password
export const comparePassword = async (
  currentPassword: string,
  oldPassword: string
) => {
  const compare = await bcrypt.compare(currentPassword, oldPassword);
  return compare;
};

export const sendRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie("hp", refreshToken, {
    // maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    path: "/refresh_token",
  });
};

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
