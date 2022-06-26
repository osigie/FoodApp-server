import express from "express";
import { protectRoutes } from "../middlewares/authMiddleware";

const router = express.Router();
import {
  createUser,
  getAllUserAndOrders,
} from "../controllers/userController";

router.route("/user").post(createUser).get(protectRoutes, getAllUserAndOrders);

export default router;
