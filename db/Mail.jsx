import nodemailer from "nodemailer";

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
  const transporter = nodemailer.createTransport({
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
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(success);
      }
    });
  });

  const mailData = {
    from: process.env.EMAIL_ID,
    to: email_address,
    subject: "Verification Code",
    html: template,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};

export default Mail;
