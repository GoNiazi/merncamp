import Post from "../models/post";
import User from "../models/user";
import cloudinary from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const createpost = async (req, res) => {
  const { content, image } = req.body;
  if (!content.length) {
    return res.json({
      error: "Content is required",
    });
  }
  try {
    const post = new Post({ content, image, postedBy: req.user._id });
    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    console.log(result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postedByUser = async (req, res) => {
  try {
    console.log("im in posts");
    const posts = await Post.find({ postedBy: req.user._id })
      .populate("postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(posts);
  } catch (error) {}
};

export const UserPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id)
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image");
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};
export const Updatepost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
      next: true,
    });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const Deletepost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params._id);
    if (post.image && post.image.Public_id) {
      const image = await cloudinary.uploader.destroy(post.image.Public_id);
    }
    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const newsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let following = user.following;
    following.push(req.user._id);
    const currentpage = req.params.page || 1;
    const perpage = 3;

    const posts = await Post.find({ postedBy: { $in: following } })
      .skip((currentpage - 1) * perpage)
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(perpage);
    res.json(posts);
  } catch (error) {}
};
export const postLike = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    );
    console.log("send like");
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};
export const postUnlike = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};
export const addComment = async (req, res) => {
  try {
    const { postid, comment } = req.body;
    const post = await Post.findByIdAndUpdate(
      postid,
      {
        $push: { comments: { text: comment, postedBy: req.user._id } },
      },
      { new: true }
    )
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image");
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};
export const removeComment = async (req, res) => {
  try {
    const { postid, comment } = req.body;
    console.log("comment", comment);
    console.log(comment._id);

    const post = await Post.findByIdAndUpdate(
      postid,
      {
        $pull: { comments: { text: comment.text } },
      },
      { new: true }
    );
    console.log(post);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const totalPosts = async (req, res) => {
  try {
    const total = await Post.find().estimatedDocumentCount();
    console.log("total: ", total);
    res.json(total);
  } catch (error) {
    console.log(error);
  }
};

export const posts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name username image")
      .populate("comments.postedBy", " _id name username image")
      .sort({ createdAt: -1 })
      .limit(12);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};
export const post = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id)
      .populate("postedBy", "_id name username image")
      .populate("comments.postedBy", " _id name username image");
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};
