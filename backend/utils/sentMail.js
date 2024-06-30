const User = require("..//model/user");
const otpSchema = require("..//model/otp");
const nodemailer = require("nodemailer");
var Mailgen = require("mailgen");

require("dotenv").config();

module.exports = async (email) => {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  const otpData = await otpSchema.create({
    otp: otp,
    userId: user.id,
    createdAt: Date.now(),
    expiresAt: Date.now() + 600000, // 10 minutes
  });

  await otpData.save();

  var mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Flipkart",
      link: process.env.URL,
    },
  });

  var emailData = {
    body: {
      name: user?.name,
      intro: "Welcome to Flipkart! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Flipkart, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: otp,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    }
  };

  var emailBody = mailGenerator.generate(emailData);
  var emailText = mailGenerator.generatePlaintext(emailData);

  const info=await transporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: "Flipkart OTP Verification",
    text: emailText,
    html: emailBody,
  })

  if(info.messageId){
      return {message:`otp sent successfully ${user.email}`,email:user.email,userId:user.id};

  }


  
};
