import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "lestagewholesaler@gmail.com",
    pass: process.env.MAIL,
  },
  tls: { rejectUnauthorized: false },
});
