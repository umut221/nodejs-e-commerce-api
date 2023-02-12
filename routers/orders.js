const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController")


router.get("/getAll", ordersController.getAll);

module.exports = router;