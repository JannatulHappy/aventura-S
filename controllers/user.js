import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "test";

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });//if user sign up -already

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
// if user did't sign up
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "2h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
