const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoriesController")

router.get("/getAll", categoryController.getAll);

router.get("/getById/:id", categoryController.getById);

router.post("/create", categoryController.create);

router.put("/update/:id", categoryController.update);

router.delete("/delete/:id", categoryController.delete);

module.exports = router;
