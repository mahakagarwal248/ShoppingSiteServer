import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import buffer from "buffer";
import path from "path";
import { fileURLToPath } from "url";

import users from "../models/user.js";
import SendEmail from "../helpers/SendEmail.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const passwordChangedTemplate = path.join(
  __dirname,
  "../templates/passwordChanged.ejs"
);

export const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    mobile,
    address,
    securityQues,
    securityAns,
    role,
  } = req.body;
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
      role,
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

export const getAllUsers = async (req, res) => {
  try {
    const usersList = await users.find();
    res.status(200).json(usersList);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
  const { oldPassword, email, newPassword } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    if (oldPassword) {
      const isPasswordCrt = await bcrypt.compare(
        oldPassword,
        existingUser.password
      );
      if (!isPasswordCrt) {
        return res.status(400).json("Please Enter Correct Existing password");
      }
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await users.findOneAndUpdate(
      { _id: existingUser?._id },
      { password: hashedPassword }
    );
    const mailData = {
      heading: "Password Changed Successfully",
      template: passwordChangedTemplate,
      websiteUrl: __dirname,
      name: existingUser?.name,
      email: existingUser?.email,
    };
    SendEmail(mailData);
    return res.status(200).json("Password Changed Successfully");
  } catch (error) {
    return res.status(405).json(error.message);
  }
};
