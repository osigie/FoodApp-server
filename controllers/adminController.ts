import adminDb from "../models/admin";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import JwtPayload from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import {
  generateToken,
  comparePassword,
  hashing,
  generateRefreshToken,
  sendRefreshToken,
} from "../utils";
import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "../Errors/CustomApi";
import { NotFound } from "../Errors/NotFound";
import { BadRequest } from "../Errors/BadRequest";
const secret = process.env.JWT_SECRET as string;

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      // res
      //   .status(StatusCodes.BAD_REQUEST)
      //   .json({ message: "Please add all fields" });
      throw new BadRequest("Please add all fields");
    }
    //check if Admin exist
    const isExist = await adminDb.findOne({ email });
    if (isExist) {
      // res
      //   .status(StatusCodes.BAD_REQUEST)
      //   .json({ message: "Admin already exists" });
      // return;
      throw new BadRequest("Admin already exists");
    }
    const hashedPassword = await hashing(password);

    //Create Admin
    await adminDb.create({
      name,
      email,
      password: hashedPassword,
    });

    const admin = await adminDb.findOne({ email });

    if (admin) {
      const token = generateToken(admin._id);
      const refreshToken = generateRefreshToken(admin._id);
      sendRefreshToken(res, refreshToken);
      res.status(201).json({ admin: { _id: admin.id, name, email }, token });
    } else {
      // res.status(400).json({ message: "Invalid admin data" });
      throw new BadRequest("Invalid admin data");
    }
    // } catch (error) {
    // console.log(error);
    // next(error);
    // }
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // try {
    const { email, password } = req.body;

    //check for admin in db
    const admin = await adminDb.findOne({ email });
    //compare the password if they match
    const matchPassword = await comparePassword(password, admin.password);
    const token = generateToken(admin._id);
    const refreshToken = generateRefreshToken(admin._id);
    sendRefreshToken(res, refreshToken);

    if (admin && matchPassword) {
      res
        .status(200)
        .json({ admin: { _id: admin.id, name: admin.name, email }, token });
      return;
    } else {
      // res;
      // res
      //   .status(StatusCodes.BAD_REQUEST)
      //   .json({ message: "Invalid Credentails" });
      // return;
      throw new BadRequest("Invalid credentials");
    }
    // } catch (error) {
    //   res
    //     .status(StatusCodes.BAD_REQUEST)
    //     .json({ message: "Invalid Credentails" });
    //   next(error);
    // }
  }
);

export const refreshToken = async (req: Request, res: Response) => {
  const cookieFromClient = req.cookies.hp;
  if (!cookieFromClient) {
    return res.status(200).json({ ok: false, accessToken: "" });
  }

  let payload: jwt.JwtPayload;
  try {
    payload = jwt.verify(cookieFromClient, secret) as jwt.JwtPayload;
  } catch (error) {
    return res.status(200).json({ ok: false, accessToken: "" });
  }

  //token is valid we can now send a new access token
  const admin = await adminDb.findOne({ _id: payload.id });

  if (!admin) {
    return res.status(200).json({ ok: false, accessToken: "" });
  }

  const refreshToken = generateRefreshToken(admin._id);
  sendRefreshToken(res, refreshToken);
  return res
    .status(200)
    .json({ ok: true, accessToken: generateToken(admin._id) });
};
