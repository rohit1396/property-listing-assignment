import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userControllers.js";
import { verifyJWT } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

export { router as userRouter };
