"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
var notFoundMiddleware = function (req, res) {
    res.status(404).send({ msg: "Route Not Found" });
};
exports.notFoundMiddleware = notFoundMiddleware;
