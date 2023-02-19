const categoryService = require("../services/categoryService");

exports.getAll = async (req, res) => {
  const result = await categoryService.getAll();
  res.send(result);
};

exports.getById = async (req, res) => {
  const result = await categoryService.getById(req.params.id);
  res.send(result);
};

exports.create = async (req, res) => {
  const result = await categoryService.create(req.body);
  res.send(result);
};

exports.update = async (req, res) => {
  const result = await categoryService.update(req.params.id, req.body);
  res.send(result);
};

exports.delete = async (req, res) => {
  const result = await categoryService.deleteById(req.params.id);
  res.send(result);
};
