const { Order } = require("../models/order");
const { OrderItem } = require("../models/orderItem");

async function getAll() {
  const orders = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });
  if (!orders) return { success: false, message: "error" };
  return { success: true, orders: orders };
}

async function create(order) {
  const orderItemsIds = Promise.all(
    order.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  const orderItemsIdsResolved = await orderItemsIds;
  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      const price = orderItem.product.price * orderItem.quantity;
      return price;
    })
  );
  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  let createdOrder = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: order.shippingAddress1,
    shippingAddress2: order.shippingAddress2,
    city: order.city,
    zip: order.zip,
    country: order.country,
    phone: order.phone,
    status: order.status,
    totalPrice: totalPrice,
    user: order.user,
  });
  createdOrder = await createdOrder.save();
  if (!createdOrder)
    return { success: false, message: "The order cannot be created!" };
  return { success: true, message: "The order successfully created" };
}

async function getById(id) {
  const order = await Order.findById(id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .catch((err) => {
      return { success: false, error: err };
    });
  if (!order)
    return {
      success: false,
      message: "The order with the given ID was not found!",
    };

  return { success: true, order: order };
}

async function update(id, status) {
  const order = await Order.findByIdAndUpdate(
    id,
    {
      status: status,
    },
    { new: true }
  );
  if (!order)
    return { success: false, message: "The order cannot be updated." };
  return { success: true, message: "The order successfully updated." };
}

async function deleteById(id) {
  Order.findByIdAndRemove(id)
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem).catch((err) => {
            return {
              success: false,
              message:
                "An error was encountered while deleting order items. " + err,
            };
          });
        });
        return { success: true, message: "Order successfully deleted" };
      } else return { success: false, message: "Order not found!" };
    })
    .catch((err) => {
      return { success: false, message: err };
    });
}

async function getTotalSales() {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
  ]);
  if (!totalSales)
    return { success: false, message: "The order sales cannot be generated." };
  return { success: true, totalSales: totalSales.pop().totalSales };
}

async function getCount() {
  const orderCount = await Order.countDocuments();
  if (!orderCount)
    return { success: false, message: "An unexpected error was encountered." };
  return { success: true, orderCount: orderCount };
}

async function userOrders(id) {
  const userOrderList = await Order.find({ user: id })
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .sort({ dateOrdered: -1 });

  if (!userOrderList)
    return { success: false, message: "An unexpected error was encountered." };
  return { success: true, userOrderList: userOrderList };
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteById,
  getTotalSales,
  getCount,
  userOrders,
};
