"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomApiError = void 0;
var CustomApiError = /** @class */ (function () {
    function CustomApiError(message, status) {
        this.message = message;
        this.status = status;
    }
    return CustomApiError;
}());
exports.CustomApiError = CustomApiError;
