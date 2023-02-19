const userService = require("../services/usersService");

exports.getAllUsers = async (req, res) => {
  const result = await userService.getAll();
  res.send(result);
};

exports.getById = async (req, res) => {
  const result = await userService.getById(req.params.id);
  res.send(result);
};

exports.getUserCount = async (req, res) => {
  const result = await userService.getCount();
  res.send(result);
};

exports.deleteById = async (req, res) => {
  const result = await userService.deleteById(req.params.id);
  res.send(result);
};
