import db from "../../../db";
import jwt from "jsonwebtoken";
import User from "../../../db/UserSchema";
import { serialize } from "cookie";
import ShortUniqueId from "short-unique-id";
import nodemailer from "nodemailer";

db();
const uid = new ShortUniqueId({ length: 6 });

const Mail = async ({ name, email_address, verification_code }) => {
  const template = `
    <div
      style="
        color: #00553a;
        text-align: center;
        font-weight: normal;
        font-size: 30px;
        margin: 50px 0px 20px 0px;
        text-transform: capitalize;
      "
    >
      Hii ${name},
    </div>
    <div
      style="
        font-size: 18px;
        text-align: center;
        line-height: 28px;
        margin-bottom: 20px;
        color: #000;
      "
    >
      It seems like you're having trouble logging into Machine Hunt. If this was
      you, you can get back to your Account with the Verification code provided
      and reset your password.
    </div>
    <div
      style="
        color: #00553a;
        text-align: center;
        font-size: 30px;
        margin: 50px 0px 20px 0px;
      "
    >
      ${verification_code}
    </div>
    <div
    style="
      font-size: 14px;
      margin: 10px 0px 50px 0px;
      text-align: center;
      color: #000;
    "
  >
    Verification code is valid for 5 minutes only
  </div>
  <hr style="width: 400px" />
  <div
    style="font-size: 14px; margin: 10px 0px; text-align: center; color: #000"
  >
    © 2022 Machine Hunt | All Rights Reserved
  </div>
   `;
  nodemailer
    .createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
    .sendMail(
      {
        from: process.env.EMAIL_ID,
        to: email_address,
        subject: "Verification Code",
        html: template,
      },
      function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent successfully");
        }
      }
    );
};

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
    });
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
