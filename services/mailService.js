const nodemailer = require("nodemailer");
require("dotenv/config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_EMAIL_PASS,
  },
});

exports.sendMail = (to, subject, html) => {
  var mailOptions = {
    from: process.env.MY_EMAIL,
    to: to,
    subject: subject,
    html: html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.verifyMail = (to, name, confirmationCode) => {
  var mailOptions = {
    from: process.env.MY_EMAIL,
    to: to,
    subject: "Verify Account",
    html: `<h1>Email Confirmation</h1>
    <h2>Hello ${name}</h2>
    <p>Please confirm your email by clicking on the following link</p>
    <a href=http://localhost:3000/api/v1/auth/confirm/${confirmationCode}> Click here</a>
    </div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
