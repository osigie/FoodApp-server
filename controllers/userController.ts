import userDb from "../models/users";
import { NextFunction, Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, street, postal, city, orders } = req.body;
    if (!name || !street || !postal || !city || !orders) {
      res.status(400).json({ message: "please input all fields" });
      return;
    }
    const user = await userDb.create({ name, street, city, postal, orders });
    res.status(201).json({ message: "user created" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getAllUserAndOrders = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    if (!id) {
      res.status(404).json({ message: "Not authorized" });
    }

    const orders = await userDb.aggregate([
      {
        $unwind: {
          path: "$orders",
          includeArrayIndex: "arrayIndex",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "orders.admin": id,
        },
      },
      {
        $group: {
          _id: {
            id: "$_id",
            name: "$name",
            street: "$street",
            postal: "$postal",
            city: "$city",
            createdAt: "$createdAt",
            updatedAt: "$updatedAt",
          },
          data: {
            $push: "$orders",
          },
        },
      },
    ]);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
