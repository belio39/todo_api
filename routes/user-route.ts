import express from "express";
import {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../controller/user-controller";

const router = express.Router();

router.post("/create", createUser);
router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;
