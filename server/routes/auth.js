import express from "express";
import {
  register,
  login,
  currentUser,
  forgotpassword,
  profileUpdate,
} from "./../controllers/auth";
import { RequireSignin } from "../middlewares";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", RequireSignin, currentUser);
router.post("/forgot-password", forgotpassword);
router.put("/profile-update", RequireSignin, profileUpdate);

module.exports = router;
