const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController")


router.get("/getAll", ordersController.getAll);

router.get("/getById/:id", ordersController.getById);

router.post("/create", ordersController.create);

module.exports = router;