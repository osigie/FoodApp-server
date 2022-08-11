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
exports.refreshToken = exports.login = exports.register = void 0;
var admin_1 = __importDefault(require("../models/admin"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var utils_1 = require("../utils");
var BadRequest_1 = require("../Errors/BadRequest");
var secret = process.env.JWT_SECRET;
exports.register = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, isExist, hashedPassword, admin, token, refreshToken_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                if (!name || !email || !password) {
                    // res
                    //   .status(StatusCodes.BAD_REQUEST)
                    //   .json({ message: "Please add all fields" });
                    throw new BadRequest_1.BadRequest("Please add all fields");
                }
                return [4 /*yield*/, admin_1.default.findOne({ email: email })];
            case 1:
                isExist = _b.sent();
                if (isExist) {
                    // res
                    //   .status(StatusCodes.BAD_REQUEST)
                    //   .json({ message: "Admin already exists" });
                    // return;
                    throw new BadRequest_1.BadRequest("Admin already exists");
                }
                return [4 /*yield*/, (0, utils_1.hashing)(password)];
            case 2:
                hashedPassword = _b.sent();
                //Create Admin
                return [4 /*yield*/, admin_1.default.create({
                        name: name,
                        email: email,
                        password: hashedPassword,
                    })];
            case 3:
                //Create Admin
                _b.sent();
                return [4 /*yield*/, admin_1.default.findOne({ email: email })];
            case 4:
                admin = _b.sent();
                if (admin) {
                    token = (0, utils_1.generateToken)(admin._id);
                    refreshToken_1 = (0, utils_1.generateRefreshToken)(admin._id);
                    (0, utils_1.sendRefreshToken)(res, refreshToken_1);
                    res.status(201).json({ admin: { _id: admin.id, name: name, email: email }, token: token });
                }
                else {
                    // res.status(400).json({ message: "Invalid admin data" });
                    throw new BadRequest_1.BadRequest("Invalid admin data");
                }
                return [2 /*return*/];
        }
    });
}); });
exports.login = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, admin, matchPassword, token, refreshToken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, admin_1.default.findOne({ email: email })];
            case 1:
                admin = _b.sent();
                return [4 /*yield*/, (0, utils_1.comparePassword)(password, admin.password)];
            case 2:
                matchPassword = _b.sent();
                token = (0, utils_1.generateToken)(admin._id);
                refreshToken = (0, utils_1.generateRefreshToken)(admin._id);
                (0, utils_1.sendRefreshToken)(res, refreshToken);
                if (admin && matchPassword) {
                    res
                        .status(200)
                        .json({ admin: { _id: admin.id, name: admin.name, email: email }, token: token });
                    return [2 /*return*/];
                }
                else {
                    // res;
                    // res
                    //   .status(StatusCodes.BAD_REQUEST)
                    //   .json({ message: "Invalid Credentails" });
                    // return;
                    throw new BadRequest_1.BadRequest("Invalid credentials");
                }
                return [2 /*return*/];
        }
    });
}); });
var refreshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cookieFromClient, payload, admin, refreshToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cookieFromClient = req.cookies.hp;
                if (!cookieFromClient) {
                    return [2 /*return*/, res.status(200).json({ ok: false, accessToken: "" })];
                }
                try {
                    payload = jsonwebtoken_1.default.verify(cookieFromClient, secret);
                }
                catch (error) {
                    return [2 /*return*/, res.status(200).json({ ok: false, accessToken: "" })];
                }
                return [4 /*yield*/, admin_1.default.findOne({ _id: payload.id })];
            case 1:
                admin = _a.sent();
                if (!admin) {
                    return [2 /*return*/, res.status(200).json({ ok: false, accessToken: "" })];
                }
                refreshToken = (0, utils_1.generateRefreshToken)(admin._id);
                (0, utils_1.sendRefreshToken)(res, refreshToken);
                return [2 /*return*/, res
                        .status(200)
                        .json({ ok: true, accessToken: (0, utils_1.generateToken)(admin._id) })];
        }
    });
}); };
exports.refreshToken = refreshToken;
