const express = require("express");
const router = express.Router();


const usersController = require("../controllers/usersController")

router.get("/getAll", usersController.getAllUsers);

router.get("/getById/:id", usersController.getById);

router.get("/get/count", usersController.getUserCount);

router.delete("/delete/:id", usersController.deleteById);

module.exports = router;
