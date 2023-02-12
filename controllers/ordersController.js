const { Order } = require("../models/order");

exports.getAll = async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
};
