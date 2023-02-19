const orderService = require("../services/ordersService");

exports.getAll = async (req, res) => {
  const result = await orderService.getAll();
  res.send(result);
};

exports.create = async (req, res) => {
  const result = await orderService.create(req.body);
  res.send(result);
};

exports.getById = async (req, res) => {
  const result = await orderService.getById(req.params.id);
  res.send(result);
};

exports.update = async (req, res) => {
  const result = await orderService.update(req.param.id, req.body.status);
  res.send(result);
};

exports.delete = async (req, res) => {
  const result = await orderService.deleteById(req.params.id);
  res.send(result);
}

exports.getTotalSales = async (req, res) => {
  const result = await orderService.getTotalSales();
  res.send(result);
}

exports.getCount = async (req, res) => {
  const result = await orderService.getCount();
  res.send(result);
}

exports.userOrders = async (req, res) => {
  const result = await orderService.userOrders(req.params.userId);
  res.send(result);
}