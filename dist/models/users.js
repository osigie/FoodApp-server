"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: 100,
    },
    street: {
        type: String,
        required: [true, "Please provide street"],
        maxlength: 500,
    },
    postal: {
        type: String,
    },
    city: {
        type: String,
    },
    orders: { type: Array, default: [] },
    admin: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", UserSchema);
