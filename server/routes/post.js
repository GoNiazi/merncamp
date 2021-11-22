import express from "express";
import { createpost, uploadImage, postedByUser } from "./../controllers/post";
import { RequireSignin } from "../middlewares";
import formidable from "express-formidable";
const router = express.Router();

router.post("/create-post", RequireSignin, createpost);
router.post(
  "/upload-image",
  RequireSignin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);
router.get("/user-posts", RequireSignin, postedByUser);
module.exports = router;
