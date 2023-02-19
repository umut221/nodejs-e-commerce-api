const { Category } = require("../models/category");

async function getAll() {
  const categories = await Category.find();
  if (!categories) return { success: false, message: "error" };
  return { success: true, categories: categories };
}

async function getById(id) {
  const category = await Category.findById(id).catch((err) => {
    return { success: false, error: err };
  });
  if (!category)
    return { success: false, message: "The category is not found!!" };
  return { success: true, category: category };
}

async function create(category) {
  let createdCategory = new Category({
    name: category.name,
    icon: category.icon,
    color: category.color,
  });
  createdCategory = await createdCategory.save();
  if (!createdCategory)
    return { success: false, message: "The category cannot be created!" };
  return { success: true, message: "Category successfully created." };
}

async function update(id, category) {
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      name: category.name,
      icon: category.icon,
      color: category.color,
    },
    { new: true }
  );
  if (!updatedCategory)
    return { success: false, message: "The category cannot be updated!" };
  return { success: true, message: "The category successfully updated." };
}

async function deleteById(id) {
  await Category.findByIdAndRemove(id)
    .then((category) => {
      if (category)
        return { success: true, message: "The category is deleted!" };
      else return { success: false, message: "Category not found!" };
    })
    .catch((err) => {
      return { success: false, error: err };
    });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
