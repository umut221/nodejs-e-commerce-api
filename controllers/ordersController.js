const { Order } = require("../models/order");

exports.getAll = async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
};

exports.create = async (req, res) => {
    const orderItemsIds = Promise.all(req.body.orterItems.map(async orderItem => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product
      });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      }));
      const orderItemsIdsResolved = await orderItemsIds;

    let order = new Order({
      orderItems: orderItemsIdsResolved,
      orderItems: req.body.orderItems,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: req.body.totalPrice,
      user: req.body.user,

    });
    order = await order.save();
    if (!order) return res.status(404).send("the order cannot be created!");
    res.send({success: true});
  };


  exports.getById = async (req, res) => {
    const order = await Order.findById(req.params.id).catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
    if (!order)
      res.status(500).json({
        success: false,
        message: "The order with the given ID was not found!",
      });
    res.send(order);
  };
