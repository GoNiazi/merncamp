import express from "express";
import {
  createpost,
  uploadImage,
  postedByUser,
  UserPost,
  Updatepost,
  Deletepost,
  newsFeed,
  postUnlike,
  postLike,
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
router.get("/newsfeed", RequireSignin, newsFeed);
router.put("/post-like", RequireSignin, postLike);
router.put("/post-unlike", RequireSignin, postUnlike);

module.exports = router;
