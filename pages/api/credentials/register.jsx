import db from "../../../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../../db/UserSchema";
import ErrorHandler from "../../../db/ErrorHandler";
import { serialize } from "cookie";

db();

const Register = async (req, res) => {
  const { method } = req;
  if (method !== "POST") {
    return res.status(400).json({
      type: "error",
      message: "Bad request",
    });
  }
  const { name, email_address, password } = req.body;
  try {
    const user_response = await User.create({
      name,
      email_address,
      password: await bcrypt.hash(password, 10),
    });
    res
      .setHeader(
        "Set-Cookie",
        serialize(
          "token",
          jwt.sign(
            {
              user_id: user_response._id,
            },
            process.env.JWT_SECRET
          ),
          {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: "/",
          }
        )
      )
      .status(200)
      .json({ type: "success", message: "Register Successfully" });
  } catch (err) {
    ErrorHandler(err, res);
  }
};

export default Register;
