"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = express_1.default.Router();
var userController_1 = require("../controllers/userController");
router.route("/user").post(userController_1.createUser).get(userController_1.getAllUserAndOrders);
router.route("/user/admin").get(authMiddleware_1.protectRoutes, userController_1.getMealsbyAdmin);
exports.default = router;
