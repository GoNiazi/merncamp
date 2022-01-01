import User from "./../models/user";
import { hashPassword, comparepassword } from "./../helpers/auth";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
export const register = async (req, res) => {
  const { name, email, password, secret } = req.body;

  //VALIDATION
  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }

  if (!password || password.length < 6) {
    return res.json({
      error: " Password is requires and should be 6 characters long",
    });
  }
  if (!secret) {
    return res.json({
      error: "Answer is required",
    });
  }
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({
      error: "Email is Taken",
    });
  }
  //HASH PASSWRORD
  const hashedpassword = await hashPassword(password);

  //POST VALUES
  const user = new User({
    name,
    email,
    password: hashedpassword,
    secret,
    username: nanoid(6),
  });
  try {
    await user.save();

    return res.json({
      ok: true,
    });
  } catch (error) {
    console.log("Registeration Error => ", error);
    return res.json({
      error: "Try again ",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        error: "User not found",
      });
    }
    const match = await comparepassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Password not matched",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error, try again");
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

export const forgotpassword = async (req, res) => {
  const { email, newpassword, secret } = req.body;
  if (!email) {
    return res.json({
      error: "Email is Required",
    });
  }
  if (!newpassword || newpassword < 6) {
    return res.json({
      error: "New password is required and should be 6 characters long",
    });
  }
  if (!secret) {
    return res.json({
      error: "Secert is required",
    });
  }
  const user = await User.findOne({ email, secret });
  if (!user) {
    return res.json({
      error: "We cannot verify you with these details",
    });
  }
  try {
    const hashedPassword = await hashPassword(newpassword);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    console.log("im after update");
    return res.json({
      success: "Congrats, Now you can login with new password",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "somthing wrong, Try again",
    });
  }
};

export const profileUpdate = async (req, res) => {
  console.log(req.body);
  try {
    let data = {};

    if (req.body.username) {
      data.username = req.body.username;
    }
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.about) {
      data.about = req.body.about;
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        res.json({
          error: "Password should be Larger than 6 characters",
        });
      } else {
        data.password = await hashedPassword(req.body.password);
      }
    }
    if (req.body.secret) {
      data.secret = req.body.secret;
    }
    if (req.body.image) {
      data.image = req.body.image;
    }

    let user = await User.findByIdAndUpdate(req.user._id, data, { new: true });
    user.password = undefined;
    user.secret = undefined;
    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      res.json({
        error: "Username is already Taken",
      });
    }
    console.log(error);
  }
};

export const findPeople = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let following = user.following;
    following.push(user._id);
    console.log(following);
    const people = await User.find({ _id: { $nin: following } })
      .select("-password -secret")
      .limit(10);
    console.log(people);
    res.json(people);
  } catch (error) {
    console.log(error);
  }
};
//midlewares
export const addFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $addToSet: { followers: req.user._id },
    });
    next();
  } catch (error) {
    console.log(error);
  }
};
export const userFollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { following: req.body._id },
      },
      { new: true }
    ).select("-password -secret");
    console.log("sending user");
    res.json(user);
    console.log("sended");
  } catch (error) {
    console.log(error);
  }
};
export const userFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const following = await User.find({ _id: user.following }).limit(20);
    res.json(following);
  } catch (error) {
    console.log(error);
  }
};
//midleware
export const removeFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $pull: { followers: req.user._id },
    });
    next();
  } catch (error) {
    console.log(error);
  }
};
export const userunFollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: req.body._id },
      },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
