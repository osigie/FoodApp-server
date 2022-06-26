import express from "express";
import { protectRoutes } from "../middlewares/authMiddleware";
import { validate, mealsSchema } from "../validation";
const router = express.Router();
import {
  createMeals,
  deleteMeals,
  getMeals,
  getOneMeal,
  updateMeal,
  getAdminMeals,
} from "../controllers/mealsController";

router
  .route("/meals")
  .post(protectRoutes, validate(mealsSchema), createMeals)
  .get(getMeals);
router
  .route("/meals/:id")
  .get(getOneMeal)
  .patch(protectRoutes, updateMeal)
  .delete(protectRoutes, deleteMeals);

router.route("/meals/admin/v1").get(protectRoutes, getAdminMeals);

export default router;
