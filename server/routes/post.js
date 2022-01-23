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
  removeComment,
  addComment,
  totalPosts,
  posts,
  post,
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
router.get("/newsfeed/:page", RequireSignin, newsFeed);
router.put("/post-like", RequireSignin, postLike);
router.put("/post-unlike", RequireSignin, postUnlike);
router.put("/add-comment", RequireSignin, addComment);
router.put("/remove-comment", RequireSignin, removeComment);
router.get("/total-posts", totalPosts);
router.get("/posts", posts);
router.get("/post/:_id", post);
module.exports = router;
