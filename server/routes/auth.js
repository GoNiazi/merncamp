import express from "express";
import {
  register,
  login,
  currentUser,
  forgotpassword,
  profileUpdate,
  findPeople,
  addFollower,
  userFollow,
  userFollowing,
  removeFollower,
  userunFollow,
} from "./../controllers/auth";
import { RequireSignin } from "../middlewares";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", RequireSignin, currentUser);
router.post("/forgot-password", forgotpassword);
router.put("/profile-update", RequireSignin, profileUpdate);
router.get("/find-people", RequireSignin, findPeople);
router.put("/user-follow", RequireSignin, addFollower, userFollow);
router.get("/user-following", RequireSignin, userFollowing);
router.put("/user-unfollowing", RequireSignin, removeFollower, userunFollow);
module.exports = router;
