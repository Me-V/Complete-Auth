import express from "express";
import {
  login,
  logout,
  signupWithEmail,
  signupWithPhone,
  verifyEmail,
  verifyOtp,
  forgotPassword,
  resetPassword,
  checkAuth,
  loginWithPhone,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup-email", signupWithEmail);
router.post("/signup-phone", signupWithPhone);
router.post("/login", login);
router.post("/login-with-phone", loginWithPhone);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

// router.post("/send-otp", sendOtp);

export default router;
