import nodemailer from "nodemailer";

const sendMail = async ({ email, subject, message }) => {
  const transPorter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: "2525",
    auth: {
      user: "486ebd3bec64cc",
      pass: "95722d456cf7f6",
    },
  });

  const emailOptions = {
    from: "blosly support<support@blogsly.com>",
    to: email,
    subject,
    text: message,
  };

  await transPorter.sendMail(emailOptions);
};

export default sendMail;
