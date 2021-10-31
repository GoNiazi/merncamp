import User from "./../models/user";
import { hashPassword, comparepassword } from "./../helpers/auth";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { name, email, password, secret } = req.body;
  //VALIDATION
  if (!name) return res.status(400).send("Name is required");
  if (!password || password.length < 6) {
    return res
      .status(400)
      .send("Password is requires and should be 6 characters long");
  }
  if (!secret) return res.status(400).send("Answer is required");
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).send("Email is Taken");
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
    res.status(400).send("Error!! Try Again");
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    const match = await comparepassword(password, user.password);
    if (!match) return res.status(400).send("Wron Password");
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "20000",
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error, try again");
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
