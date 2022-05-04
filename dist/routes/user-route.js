"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const router = express_1.default.Router();
router.post("/create", user_controller_1.createUser);
router.get("/", user_controller_1.getUsers);
router.get("/:id", user_controller_1.getSingleUser);
router.put("/:id", user_controller_1.updateUser);
exports.default = router;
