import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import buffer from "buffer";

import users from "../models/user.js";

export const signup = async (req, res) => {
  const { name, email, password, mobile, address, securityQues, securityAns } =
    req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      alert("User already exist");
      return res.status(404).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const hashedAns = await bcrypt.hash(securityAns, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      address,
      securityQues,
      securityAns: hashedAns,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
  }
};

export const login = async (req, res) => {
  const data = req.body;
  const encodedText = JSON.stringify(data);
  const decodedText = buffer.Buffer.from(encodedText, "base64").toString(
    "ascii"
  );
  const actual = JSON.parse(decodedText);
  const { email, password } = actual;

  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User don't exist" });
    }

    const isPasswordCrt = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};
export const fetchSecurityQues = async (req, res) => {
  const { email: email } = req.params;
  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const user = await users.findOne({ email: email });
    const ques = user.securityQues;
    res.status(200).json(ques);
  } catch (error) {}
};
export const forgotPassword = async (req, res) => {
  const { email, ans } = req.body;

  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isAnsCrt = await bcrypt.compare(ans, existingUser.securityAns);
    if (!isAnsCrt) {
      return res.status(400).json({ message: "Answer doesn't match" });
    }
    res.status(200).json("answer matched");
  } catch (error) {}
};
export const changePassword = async (req, res) => {
  const { email, newPW } = req.body;

  try {
    const existingUser = await users.find({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const hashedPassword = await bcrypt.hash(newPW, 12);

    const user = await users.findOne({ email: email });
    const _id = user._id;

    await users.findByIdAndUpdate(_id, { $set: { password: hashedPassword } });
    res.status(200).json({ message: "Password Changed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(405).json({ message: error.message });
  }
};
