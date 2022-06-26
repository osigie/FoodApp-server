"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminMeals = exports.deleteMeals = exports.updateMeal = exports.getOneMeal = exports.getMeals = exports.createMeals = void 0;
var meals_1 = __importDefault(require("../models/meals"));
var http_status_codes_1 = require("http-status-codes");
var meals_2 = __importDefault(require("../models/meals"));
var createMeals = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name_1, description, amount, price, mealsCreated, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.user.id;
                if (!id) {
                    res.status(404).json({ message: "Not authorized" });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = req.body, name_1 = _a.name, description = _a.description, amount = _a.amount, price = _a.price;
                return [4 /*yield*/, meals_2.default.create({
                        name: name_1,
                        description: description,
                        amount: amount,
                        price: price,
                        admin: id,
                    })];
            case 2:
                mealsCreated = _b.sent();
                mealsCreated
                    ? res
                        .status(http_status_codes_1.StatusCodes.CREATED)
                        .json({ message: "Meal successfully created" })
                    : res
                        .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                        .json({ message: "Please input all fields" });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createMeals = createMeals;
var getMeals = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var meals_3, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, meals_1.default.find()];
            case 1:
                meals_3 = _a.sent();
                res.status(200).json(meals_3);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMeals = getMeals;
var getOneMeal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, meal, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, meals_1.default.findOne({ _id: id })];
            case 1:
                meal = _a.sent();
                meal
                    ? res.status(200).json(meal)
                    : res.status(400).json({ message: "Meal not found" });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOneMeal = getOneMeal;
var updateMeal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, admin, updateBody, meal, update, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                admin = req.user.id;
                updateBody = req.body;
                return [4 /*yield*/, meals_1.default.findOne({ admin: admin })];
            case 1:
                meal = _a.sent();
                if (!meal) {
                    res.status(404).json({ message: "meal not found" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, meals_1.default.findOneAndUpdate({ _id: id }, __assign({}, updateBody), { new: true })];
            case 2:
                update = _a.sent();
                res.status(200).json(update);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({ message: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateMeal = updateMeal;
var deleteMeals = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, admin, meal, deleted, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                admin = req.user.id;
                return [4 /*yield*/, meals_1.default.findOne({ admin: admin })];
            case 1:
                meal = _a.sent();
                if (!meal) {
                    res.status(404).json({ message: "Not authorized" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, meals_1.default.findByIdAndDelete({ _id: id })];
            case 2:
                deleted = _a.sent();
                deleted
                    ? res.status(200).json({ message: "Meal deleted successfully" })
                    : res.status(404).json({ message: "Meal not found" });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteMeals = deleteMeals;
var getAdminMeals = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, meals_4, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.user.id;
                if (!id) {
                    res.status(404).json({ message: "Not authorized" });
                }
                return [4 /*yield*/, meals_1.default.find({ admin: id })];
            case 1:
                meals_4 = _a.sent();
                res.status(200).json(meals_4);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500).json({ message: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAdminMeals = getAdminMeals;
