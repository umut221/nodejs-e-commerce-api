const authService = require("../services/authService");

exports.register = async (req, res) => {
  const result = await authService.register(req.body);
  res.send(result);
};

exports.login = async (req, res) => {
  const result = await authService.login(req.body.email, req.body.password);
  res.send(result);
};

exports.verifyUser = (req, res) => {
  const result = authService.verifyUser(req.params.confirmationCode);
  res.send(result);
} 
