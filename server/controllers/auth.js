import User from "./../models/user";
import { hashPassword, comparepassword } from "./../helpers/auth";
import jwt from "jsonwebtoken";
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
  const user = new User({ name, email, password: hashedpassword, secret });
  try {
    await user.save();
    console.log(user);
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
    console.log(user);
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
