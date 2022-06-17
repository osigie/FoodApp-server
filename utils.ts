import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET as string;
//generate token
export const generateToken = (id: string) => {
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
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
