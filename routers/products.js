const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/getAll", productController.getAll);

router.get("/getById/:id", productController.getById);

router.post("/create", productController.createProduct);

router.put("/update/:id", productController.updateProduct);

router.delete("/delete/:id", productController.deleteProduct);

router.get("/getCount", productController.getProductCount);

router.get("/get/featured", productController.getFeaturedProducts);

router.get("/getByCategories", productController.getByCategories);

router.post("/fileUpload",productController.fileUpload);

module.exports = router;





// populate() eklendiğinde bağlı olduğu entity'nin detayları da gelir bu örnekte kategori.

//   router.get("/:id", async (req, res) => {
//     const product = await Product.findById(req.params.id).populate("category").catch((err) => {
//       res.status(400).json({ success: false, error: err });
//     });
//     if (!product)
//       res.status(500).json({
//         success: false,
//         message: "The product with the given ID was not found!",
//       });
//     res.send(product);
//   });

