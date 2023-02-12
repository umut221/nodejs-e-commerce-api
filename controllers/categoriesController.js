const { Category } = require("../models/category");

exports.getAll = async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
};

exports.getById = async (req, res) => {
  const category = await Category.findById(req.params.id).catch((err) => {
    res.status(400).json({ success: false, error: err });
  });
  if (!category)
    res.status(500).json({
      success: false,
      message: "The category with the given ID was not found!",
    });
  res.send(category);
};

exports.create = async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = category.save();
  if (!category) return res.status(404).send("the category cannot be created!");
  res.send({ success: true });
};

exports.update = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category) return res.status(404).send("the category cannot be updated!");
  res.send({ success: true });
};

exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category)
        return res
          .status(200)
          .json({ success: true, message: "The category is deleted!" });
      else
        return res
          .status(404)
          .json({ success: false, message: "Category not found!" });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};
