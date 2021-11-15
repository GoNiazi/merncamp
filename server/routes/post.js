import express from "express";
import { createpost } from "./../controllers/post";
import { RequireSignin } from "../middlewares";
const router = express.Router();

router.post("/create-post", RequireSignin, createpost);

module.exports = router;
