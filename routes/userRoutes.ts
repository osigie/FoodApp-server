import express from "express";
import { protectRoutes } from "../middlewares/authMiddleware";

const router = express.Router();
import {
  createUser,
  getAllUserAndOrders,
  getMealsbyAdmin,
} from "../controllers/userController";

router.route("/user").post(createUser).get(getAllUserAndOrders);
router.route("/user/admin").get(protectRoutes, getMealsbyAdmin);

export default router;
