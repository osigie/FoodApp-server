import { z, AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const PasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const PasswordError =
  "Password must be at least 8 character, include uppercase, lowercase, digit and special character.";

export const AdminSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    email: z
      .string({
        required_error: "email is required",
      })
      .email({ message: "it must be a valid email" }),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(8, {
        message: "password must be 8 characters long or more",
      })
      .regex(PasswordRegex, { message: PasswordError }),
  }),
});

/////^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const mealsSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "name is required",
      })
      .min(2, {
        message: "name must be 2 characters long or more",
      }),

    description: z
      .string({
        required_error: "name is required",
      })
      .min(2, {
        message: "description must be 2 characters long or more",
      }),

    price: z
      .number({
        required_error: "price is required",
      })
      .positive({ message: "Price must be a postive number" }),
  }),
});

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.flatten().fieldErrors.body.toString() });
    }
  };
