"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
var http_status_codes_1 = require("http-status-codes");
var errorHandlerMiddleware = function (err, req, res, next) {
    var defaultError = {
        statusCode: err.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong",
    };
    console.log("error", defaultError);
    res.status(defaultError.statusCode).json({ message: defaultError.msg });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
