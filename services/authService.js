const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");

async function register(user) {
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
  });
  createdUser = await createdUser.save();
  if (!user) return { success: false, message: "The user cannot be created!" };
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
      process.env.SECRET_STRING,
      {
        expiresIn: "1d",
      }
    );
    return { user: user.email, token: token };
  } else return { success: false, message: "Password is wrong" };
}

module.exports = {
  register,
  login,
};
