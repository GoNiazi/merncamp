import express from "express";
import {
  createpost,
  uploadImage,
  postedByUser,
  UserPost,
  Updatepost,
  Deletepost,
} from "./../controllers/post";
import { RequireSignin, canEditDeletePost } from "../middlewares";
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
router.get("/user-post/:_id", RequireSignin, UserPost);
router.put("/update-post/:_id", RequireSignin, canEditDeletePost, Updatepost);
router.delete(
  "/delete-post/:_id",
  RequireSignin,
  canEditDeletePost,
  Deletepost
);
module.exports = router;
