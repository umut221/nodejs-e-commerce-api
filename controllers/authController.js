const mongoose = require("mongoose");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");

exports.register = async (req, res) => {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    });
    user = user.save();
    if (!user) return res.status(404).send("the user cannot be created!");
    res.send({ success: true });
  }

exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("The user not found");
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
          {
              userId: user.id,
              isAdmin:user.isAdmin
          },
          process.env.SECRET_STRING,
          {
              expiresIn: '1d'
          }
      );
      res.status(200).send({user: user.email, token: token} );
    } else res.status(400).send("password wrong!");
  }