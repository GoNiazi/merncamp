import express from "express";
import { register, login, currentUser } from "./../controllers/auth";
import { RequireSignin } from "../middlewares";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", RequireSignin, currentUser);

module.exports = router;
