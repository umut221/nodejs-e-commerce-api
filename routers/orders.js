const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController")


router.get("/getAll", ordersController.getAll);

router.get("/getById/:id", ordersController.getById);

router.get("/getTotalSales", ordersController.getTotalSales);

router.get("/getCount", ordersController.getCount);

router.get("/getUserOrders/:userId", ordersController.userOrders);

router.post("/create", ordersController.create);

router.put("/update/:id", ordersController.update);

router.delete("/delete/:id", ordersController.delete);


module.exports = router;