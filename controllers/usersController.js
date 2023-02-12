const { User } = require("../models/user");
require("dotenv/config");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-passwordHash");
  res.send(users);
};

exports.getById = async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-passwordHash")
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
  if (!user)
    res.status(500).json({
      success: false,
      message: "The user with the given ID was not found!",
    });
  res.send(user);
};

exports.getUserCount = async (req, res) => {
  const userCount = await User.countDocuments();
  if (!userCount) res.status(500).json({ success: false });
  res.send({
    userCount: userCount,
  });
};

exports.deleteById = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user)
        return res
          .status(200)
          .json({ success: true, message: "The user is deleted!" });
      else
        return res
          .status(404)
          .json({ success: false, message: "user not found!" });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};
