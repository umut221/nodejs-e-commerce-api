const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailService = require('./mailService');
require("dotenv/config");


const secret = process.env.SECRET_STRING;

async function register(user) {
  const token = jwt.sign({email: user.email}, secret);

  if(await User.findOne({email: user.email})) return {success: false, message: "You have entered a registered email in the system."};

  let createdUser = await new User({
    name: user.name,
    email: user.email,
    passwordHash: bcrypt.hashSync(user.password, 10),
    phone: user.phone,
    isAdmin: user.isAdmin,
    apartment: user.apartment,
    zip: user.zip,
    city: user.city,
    country: user.country,
    confirmationCode: token
  });
  createdUser = await createdUser.save();
  if (!createdUser) return { success: false, message: "The user cannot be created!" };

  mailService.verifyMail(user.email, user.name, token);
  return { success: true, message: "The user successfully created." };
}

async function login(email, password) {
  const user = await User.findOne({ email: email });
  if (!user) return { success: false, message: "User not found" };
  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      {
        expiresIn: "1d",
      }
    );
    return { success: true, user: user.email, token: token };
  } else return { success: false, message: "Password is wrong" };
}

async function verifyUser(confirmationCode) {
  User.findOne({confirmationCode: confirmationCode}).then((user) => {
    if(!user) return {success: false, message: "User not found"};
    user.status = "Active";
    user.save((err) => {
      if(err) return {success: false, message: err};
    });
    return {success: true, message: "Account successfully confirmed."}
  }).catch((err) => {
    return {success: false, message: err};
  });
}

module.exports = {
  register,
  login,
  verifyUser
};
