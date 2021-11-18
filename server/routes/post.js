import express from "express";
import { createpost, uploadImage } from "./../controllers/post";
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
module.exports = router;
