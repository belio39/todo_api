"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registerschema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.Registerschema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().min(0).max(50).required(),
    date: joi_1.default.string().required(),
});
