"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authMiddleware_1 = require("../middlewares/authMiddleware");
var validation_1 = require("../validation");
var router = express_1.default.Router();
var mealsController_1 = require("../controllers/mealsController");
router.route("/meals").post(authMiddleware_1.protectRoutes, (0, validation_1.validate)(validation_1.mealsSchema), mealsController_1.createMeals).get(mealsController_1.getMeals);
router
    .route("/meals/:id")
    .get(mealsController_1.getOneMeal)
    .patch(authMiddleware_1.protectRoutes, mealsController_1.updateMeal)
    .delete(authMiddleware_1.protectRoutes, mealsController_1.deleteMeals);
exports.default = router;
