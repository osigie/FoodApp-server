import mealsDb from "../models/meals";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import meals from "../models/meals";

export const createMeals = async (req: Request, res: Response) => {
  const { id } = req.user;
  if (!id) {
    res.status(404).json({ message: "Not authorized" });
    return;
  }
  try {
    const { name, description, amount, price } = req.body;
    const mealsCreated = await meals.create({
      name,
      description,
      amount,
      price,
      admin: id,
    });
    mealsCreated
      ? res
          .status(StatusCodes.CREATED)
          .json({ message: "Meal successfully created" })
      : res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Please input all fields" });
  } catch (error) {
    console.log(error);
  }
};

export const getMeals = async (req: Request, res: Response) => {
  try {
    const meals = await mealsDb.find();
    res.status(200).json(meals);
  } catch (error) {
    console.log(error);
  }
};

export const getOneMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const meal = await mealsDb.findOne({ _id: id });
    meal
      ? res.status(200).json(meal)
      : res.status(400).json({ message: "Meal not found" });
  } catch (error) {
    console.log(error);
  }
};

export const updateMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { id: admin } = req.user;
    const updateBody = req.body;

    const meal = await mealsDb.findOne({ admin });
    if (!meal) {
      res.status(404).json({ message: "meal not found" });
      return;
    }
    const update = await mealsDb.findOneAndUpdate(
      { _id: id },
      { ...updateBody },
      { new: true }
    );
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMeals = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { id: admin } = req.user;

    const meal = await mealsDb.findOne({ admin });
    if (!meal) {
      res.status(404).json({ message: "Not authorized" });
      return;
    }
    const deleted = await mealsDb.findByIdAndDelete({ _id: id });
    deleted
      ? res.status(200).json({ message: "Meal deleted successfully" })
      : res.status(404).json({ message: "Meal not found" });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminMeals = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    if (!id) {
      res.status(404).json({ message: "Not authorized" });
    }
    const meals = await mealsDb.find({ admin: id });
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
