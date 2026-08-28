require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

async function sendMail() {
  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "tranvandong720218@gmail.com",
      subject: "Welcome",
      text: "Welcome to Node.js course",
      html: "<h1>Tran Van Dong</h1><p>HiHi</p>"
    });

    console.log("Email sent");
    console.log(result.messageId);
  } catch (error) {
    console.error("Send email failed");
    console.error(error);
  }
}

sendMail();
