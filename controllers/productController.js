const productService = require("../services/productService");

exports.getAll = async (req, res) => {
  const result = await productService.getAll();
  res.send(result);
};

exports.getById = async (req, res) => {
  const result = await productService.getById(req.params.id);
  res.send(result);
};

exports.createProduct = async (req, res) => {
  const result = await productService.create(req.body);
  res.send(result);
};

exports.updateProduct = async (req, res) => {
  const result = await productService.update(req.params.id, req.body);
  res.send(result);
};

exports.deleteProduct = async (req, res) => {
  const result = await productService.deleteById(req.params.id);
  res.send(result);
};

exports.getProductCount = async (req, res) => {
  const result = await productService.getCount();
  res.send(result);
};

exports.getFeaturedProducts = async (req, res) => {
  const result = await productService.getCount();
  res.send(result);
};

exports.getByCategories = async (req, res) => {
  const result = await productService.getByCategories(req.query.categories);
  res.send(result);
};
