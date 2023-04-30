import db from "../../../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../../db/UserSchema";
import ErrorHandler from "../../../db/ErrorHandler";
import { serialize } from "cookie";

db();

const Login = async (req, res) => {
  const { method } = req;
  if (method !== "POST") {
    return res.status(400).json({
      type: "error",
      message: "Bad request",
    });
  }
  const { email_address, password } = req.body;
  if (!password || !email_address) {
    return res.status(400).json({
      type: "error",
      message: "Bad request",
    });
  }
  try {
    const user_response = await User.findOne({
      email_address: email_address,
      type_of_user: "website",
    }).lean();
    if (user_response === null) {
      return res
        .status(400)
        .json({ type: "error", message: "Invalid Credential" });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      user_response.password
    );
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ type: "error", message: "Invalid Credential" });
    }
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
      .json({ type: "success", message: "Login Successfully" });
  } catch (err) {
    ErrorHandler(err, res);
  }
};

export default Login;
