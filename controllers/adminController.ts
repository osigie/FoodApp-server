import adminDb from "../models/admin";
import { NextFunction, Request, Response } from "express";
import { generateToken, comparePassword, hashing } from "../utils";
import { StatusCodes } from "http-status-codes";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please add all fields" });
    }
    //check if Admin exist
    const isExist = await adminDb.findOne({ email });
    if (isExist) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Admin already exists" });
      return;
    }
    const hashedPassword = await hashing(password);

    //Create Admin
    await adminDb.create({
      name,
      email,
      password: hashedPassword,
    });

    const admin = await adminDb.findOne({ email });

    const token = generateToken(admin._id);
    admin
      ? res.status(201).json({ admin: { _id: admin.id, name, email }, token })
      : res.status(400).json({ message: "Invalid admin data" });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //check for admin in db
    const admin = await adminDb.findOne({ email });
    //compare the password if they match
    const matchPassword = await comparePassword(password, admin.password);
    const token = generateToken(admin._id);
    if (admin && matchPassword) {
      res
        .status(200)
        .json({ admin: { _id: admin.id, name: admin.name, email }, token });
      return;
    } else {
      res;
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid Credentails" });
      return;
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid Credentails" });
  }
};
