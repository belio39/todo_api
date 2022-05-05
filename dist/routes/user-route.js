"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const router = express_1.default.Router();
router.post("/create", user_controller_1.createTodo);
router.get("/", user_controller_1.getTodos);
router.get("/:id", user_controller_1.getTodo);
router.put("/:id", user_controller_1.updateTodo);
router.delete("/:id", user_controller_1.deleteTodo);
exports.default = router;
