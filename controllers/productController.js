const { Product } = require("../models/product");
const { Category } = require("../models/category");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  const productList = await Product.find();
  res.send(productList);
};

exports.getById = async (req, res) => {
  const product = await Product.findById(req.params.id).catch((err) => {
    res.status(400).json({ success: false, error: err });
  });
  if (!product)
    res.status(500).json({
      success: false,
      message: "The product with the given ID was not found!",
    });
  res.send(product);
};

exports.createProduct = async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid category!!");

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  product
    .save()
    .then((createdProduct) => {
      res.status(200).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
};

exports.updateProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid product ID!!");
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      desciption: req.body.desciption,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );
  if (!product) return res.status(404).send("the product cannot be updated!");
  res.send({ success: true, product: product });
};

exports.deleteProduct = (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product)
        return res
          .status(200)
          .json({ success: true, message: "The product is deleted!" });
      else
        return res
          .status(404)
          .json({ success: false, message: "product not found!" });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};

exports.getProductCount = async (req, res) => {
  const productCount = await Product.countDocuments();
  if (!productCount) res.status(500).json({ success: false });
  res.send({
    productCount: productCount,
  });
};

exports.getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ isFeatured: true });
  if (!products) res.status(500).json({ success: false });
  res.send(products);
};

exports.getByCategories = async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  console.log(filter);
  const productList = await Product.find(filter);
  if (!productList) res.status(500).json({ success: false });
  res.send(productList);
};
