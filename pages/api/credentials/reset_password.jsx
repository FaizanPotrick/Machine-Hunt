import db from "../../../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../../db/UserSchema";
import ErrorHandler from "../../../db/ErrorHandler";

db();

const Reset_Password = async (req, res) => {
  const { method } = req;
  if (method !== "POST") {
    return res.status(400).json({
      type: "error",
      message: "Bad request",
    });
  }
  const { temp_session } = req.cookies;
  if (!temp_session) {
    return res.status(401).json({
      type: "error",
      message: "Unauthorized",
    });
  }
  const decoded = jwt.verify(temp_session, process.env.JWT_SECRET);
  if (decoded.step !== "reset_password") {
    return res.status(401).json({
      type: "error",
      message: "Unauthorized",
    });
  }
  const { password, confirm_password } = req.body;
  if (!password || !confirm_password) {
    return res.status(400).json({
      type: "error",
      message: "Password is required",
    });
  }
  if (password !== confirm_password) {
    return res.status(400).json({
      type: "error",
      message: "Password does not match",
    });
  }
  if (!decoded.isVerify) {
    return res.status(401).json({
      type: "error",
      message: "Unauthorized",
    });
  }
  try {
    await User.findOneAndUpdate(
      { email_address: decoded.email_address },
      { password: bcrypt.hashSync(password, 10) }
    );
  } catch (err) {
    ErrorHandler(err, res);
  }
  res
    .status(200)
    .json({ type: "success", message: "Password reset Successfully" });
};

export default Reset_Password;
