import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const Verification_Code = async (req, res) => {
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
  if (decoded.step !== "verification_code") {
    return res.status(401).json({
      type: "error",
      message: "Unauthorized",
    });
  }
  const { verification_code } = req.body;
  if (!verification_code) {
    return res.status(400).json({
      type: "error",
      message: "Verification Code is required",
    });
  }
  const date = new Date();
  if (date - decoded.time > 1000 * 60 * 5) {
    return res
      .status(400)
      .json({ type: "error", message: "Verification code expired" });
  }
  res
    .setHeader(
      "Set-Cookie",
      serialize(
        "temp_session",
        jwt.sign(
          {
            name: decoded.name,
            email_address: decoded.email_address,
            verification_code: decoded.verification_code,
            step: "reset_password",
            isVerify: true,
            time: decoded.time,
          },
          process.env.JWT_SECRET
        ),
        {
          maxAge: 1000 * 60 * 5,
          path: "/",
        }
      )
    )
    .status(200)
    .json({ type: "success", message: "Verify Successfully" });
};

export default Verification_Code;