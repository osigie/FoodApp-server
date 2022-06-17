"use strict";
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
exports.login = exports.register = void 0;
var admin_1 = __importDefault(require("../models/admin"));
var utils_1 = require("../utils");
var http_status_codes_1 = require("http-status-codes");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, isExist, hashedPassword, admin, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                if (!name_1 || !email || !password) {
                    res
                        .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                        .json({ message: "Please add all fields" });
                }
                return [4 /*yield*/, admin_1.default.findOne({ email: email })];
            case 1:
                isExist = _b.sent();
                if (isExist) {
                    res
                        .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                        .json({ message: "Admin already exists" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, utils_1.hashing)(password)];
            case 2:
                hashedPassword = _b.sent();
                //Create Admin
                return [4 /*yield*/, admin_1.default.create({
                        name: name_1,
                        email: email,
                        password: hashedPassword,
                    })];
            case 3:
                //Create Admin
                _b.sent();
                return [4 /*yield*/, admin_1.default.findOne({ email: email })];
            case 4:
                admin = _b.sent();
                token = (0, utils_1.generateToken)(admin._id);
                admin
                    ? res.status(201).json({ admin: { _id: admin.id, name: name_1, email: email }, token: token })
                    : res.status(400).json({ message: "Invalid admin data" });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, admin, matchPassword, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, admin_1.default.findOne({ email: email })];
            case 1:
                admin = _b.sent();
                return [4 /*yield*/, (0, utils_1.comparePassword)(password, admin.password)];
            case 2:
                matchPassword = _b.sent();
                token = (0, utils_1.generateToken)(admin._id);
                if (admin && matchPassword) {
                    res
                        .status(200)
                        .json({ admin: { _id: admin.id, name: admin.name, email: email }, token: token });
                    return [2 /*return*/];
                }
                else {
                    res;
                    res
                        .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                        .json({ message: "Invalid Credentails" });
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json({ message: "Invalid Credentails" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
