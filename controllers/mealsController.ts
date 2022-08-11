import mealsDb from "../models/meals";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import meals from "../models/meals";
import asyncHandler from "express-async-handler";
import { UnauthorizedRequest } from "../Errors/UnauthorizedRequest";
import { BadRequest } from "../Errors/BadRequest";
import { NotFound } from "../Errors/NotFound";



export const createMeals = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user;
  if (!id) {
    // res.status(404).json({ message: "Not authorized" });
    // return;
    throw new UnauthorizedRequest("Not authorized");
  }
  // try {
  const { name, description, amount, price } = req.body;
  const mealsCreated = await meals.create({
    name,
    description,
    amount,
    price,
    admin: id,
  });
  if (mealsCreated) {
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Meal successfully created" });
  } else {
    throw new BadRequest("Please input all fields");
  }
  // res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: "Please input all fields" });

  // } catch (error) {
  //   console.log(error);
  // }
});

export const getMeals = asyncHandler(async (req: Request, res: Response) => {
  // try {
  const meals = await mealsDb.find();
  res.status(200).json(meals);
  if (!meals) {
    throw new NotFound("meals not found");
  }
  // } catch (error) {
  // console.log(error);
  // }
});

export const getOneMeal = asyncHandler(async (req: Request, res: Response) => {
  // try {
  const { id } = req.params;
  const meal = await mealsDb.findOne({ _id: id });

  if (meal) {
    res.status(200).json(meal);
  } else {
    throw new NotFound("Meal not found");
  }
  // meal
  //   ? res.status(200).json(meal)
  //   : res.status(400).json({ message: "Meal not found" });
  // } catch (error) {
  // console.log(error);
  // }
});

export const updateMeal = asyncHandler(async (req: Request, res: Response) => {
  // try {
  const { id } = req.params;
  const { id: admin } = req.user;
  // if (!admin) {
  //   res.status(404).json({ message: "Not authorized" });
  //   return;
  // }

  if (!admin) {
    throw new UnauthorizedRequest("Not authorized");
  }
  const updateBody = req.body;

  const meal = await mealsDb.findOne({ admin });
  // if (!meal) {
  //   res.status(404).json({ message: "meal not found" });
  //   return;
  // }

  if (!meal) {
    throw new NotFound("meal not found");
  }
  const update = await mealsDb.findOneAndUpdate(
    { _id: id },
    { ...updateBody },
    { new: true }
  );
  res.status(200).json(update);
  // } catch (error) {
  // res.status(500).json({ message: "Internal Server Error" });
  // }
});

export const deleteMeals = asyncHandler(async (req: Request, res: Response) => {
  // try {
  const { id } = req.params;
  const { id: admin } = req.user;

  const meal = await mealsDb.findOne({ admin });
  // if (!meal) {
  //   res.status(404).json({ message: "Not authorized" });
  //   return;

  // }

  if (!meal) {
    throw new UnauthorizedRequest("Not authorized");
  }
  const deleted = await mealsDb.findByIdAndDelete({ _id: id });

  // deleted
  //   ? res.status(200).json({ message: "Meal deleted successfully" })
  //   : res.status(404).json({ message: "Meal not found" });

  if (deleted) {
    res.status(200).json({ message: "Meal deleted successfully" });
  } else {
    throw new NotFound("Meal not found");
  }

  // } catch (error) {
  // console.log(error);
  // }
});

export const getAdminMeals = asyncHandler(
  async (req: Request, res: Response) => {
    // try {
    const { id } = req.user;
    if (!id) {
      // res.status(404).json({ message: "Not authorized" });
      throw new UnauthorizedRequest("Not authorized");
    }
    const meals = await mealsDb.find({ admin: id });
    res.status(200).json(meals);
    if (!meals) {
      throw new NotFound("Meals not found");
    }
    // } catch (error) {
    // res.status(500).json({ message: "Internal Server Error" });
    // }
  }
);
