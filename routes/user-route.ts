import express from "express";
import {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
} from "../controller/user-controller";

const router = express.Router();

router.post("/create", createUser);
router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.put("/:id", updateUser);
export default router;
