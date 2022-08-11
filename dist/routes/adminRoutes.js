"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var validation_1 = require("../validation");
var router = express_1.default.Router();
var adminController_1 = require("../controllers/adminController");
var limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many requests from this IP, please try again after 15 minutes",
});
router.route("/admin/register").post((0, validation_1.validate)(validation_1.AdminSchema), adminController_1.register);
router.route("/admin/login").post(adminController_1.login);
router.route("/refresh_token").post(adminController_1.refreshToken);
exports.default = router;
