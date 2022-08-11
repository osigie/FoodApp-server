import express from "express";
import rateLimiter from "express-rate-limit";
import { validate, AdminSchema } from "../validation";
const router = express.Router();
import { register, login, refreshToken } from "../controllers/adminController";

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.route("/admin/register").post(validate(AdminSchema), register);
router.route("/admin/login").post(login);
router.route("/refresh_token").post(refreshToken);

export default router;
