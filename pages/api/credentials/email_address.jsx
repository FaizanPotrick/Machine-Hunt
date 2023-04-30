import db from "../../../db";
import jwt from "jsonwebtoken";
import User from "../../../db/UserSchema";
import { serialize } from "cookie";
import ShortUniqueId from "short-unique-id";
import Mail from "../../../db/Mail";

db();
const uid = new ShortUniqueId({ length: 6 });

const Email_Address = async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    const { email_address } = req.body;
    if (!email_address) {
      return res.status(400).json({
        type: "error",
        message: "Bad request",
      });
    }
    const user_response = await User.findOne({
      email_address: email_address,
      type_of_user: "website",
    }).lean();
    if (user_response === null) {
      return res
        .status(400)
        .json({ type: "error", message: "Invalid Credential" });
    }
    const verification_code = await uid();
    const token = {
      name: user_response.name,
      email_address: email_address,
      verification_code: verification_code,
      step: "verification_code",
      time: new Date(),
    };
    await Mail(token);
    return res
      .setHeader(
        "Set-Cookie",
        serialize("temp_session", jwt.sign(token, process.env.JWT_SECRET), {
          maxAge: 1000 * 60 * 5,
          path: "/",
        })
      )
      .status(200)
      .json({ type: "success", message: "Verification Code Sended" });
  } else if (method === "GET") {
    const { temp_session } = req.cookies;
    if (!temp_session) {
      return res.status(400).json({
        type: "error",
        message: "Bad request",
      });
    }
    const decoded = jwt.verify(temp_session, process.env.JWT_SECRET);
    const verification_code = await uid();
    const token = {
      name: decoded.name,
      email_address: decoded.email_address,
      verification_code: verification_code,
      step: "verification_code",
      time: new Date(),
    };
    await Mail(token);
    return res
      .setHeader(
        "Set-Cookie",
        serialize("temp_session", jwt.sign(token, process.env.JWT_SECRET), {
          maxAge: 1000 * 60 * 5,
          path: "/",
        })
      )
      .status(200)
      .json({ type: "success", message: "Verification Code Sended" });
  } else {
    return res.status(400).json({
      type: "error",
      message: "Bad request",
    });
  }
};

export default Email_Address;
