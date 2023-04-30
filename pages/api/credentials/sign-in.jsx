import db from "../../../db";
import jwt from "jsonwebtoken";
import User from "../../../db/UserSchema";
import ErrorHandler from "../../../db/ErrorHandler";
import { serialize } from "cookie";

db();

const Sign_in = async (req, res) => {
  const { method } = req;
  if (method !== "POST") {
    return res.status(400).json({
      type: "error",
      message: "Bad request",
    });
  }
  const { name, email_address } = req.body;
  try {
    const response = await User.findOne({
      email_address: email_address,
      type_of_user: "google",
    }).lean();
    let user_response;
    if (response === null) {
      user_response = await User.create({
        name: name,
        email_address: email_address,
        type_of_user: "google",
        password: "null",
      });
    }
    res
      .setHeader(
        "Set-Cookie",
        serialize(
          "token",
          jwt.sign(
            {
              user_id: response ? response._id : user_response._id,
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
      .json({ type: "success", message: "Sign-in Successfully" });
  } catch (err) {
    ErrorHandler(err, res);
  }
};

export default Sign_in;
