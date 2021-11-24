import expressJwt from "express-jwt";
import Post from "../models/post";

export const RequireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    if (req.user._id != post.postedBy) {
      return res.status(400).send("Unathorized");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
