const { Product } = require("../models/product");
const { Category } = require("../models/category");
const mongoose = require("mongoose");
const singleFileUpload = require("./fileService");


async function getAll() {
  const products = await Product.find();
  return { success: true, products: products };
}

async function getById(id) {
  const product = await Product.findById(id).catch((err) => {
    return { success: false, message: err };
  });
  if (!product)
    return {
      success: false,
      message: "The product with the given ID was not found!",
    };
  return { success: true, product: product };
}

async function create(product, protocol, host, fileName) {
  const categoryControl = await Category.findById(product.category);
  if (!categoryControl)
    return { success: false, message: "Invalid category!!" };

  const basePath = `${protocol}://${host}/public/upload${fileName}`;

  const createdProduct = new Product({
    name: product.name,
    description: product.description,
    richDescription: product.richDescription,
    image: `${basePath}${fileName}`,
    brand: product.brand,
    price: product.price,
    category: product.category,
    countInStock: product.countInStock,
    rating: product.rating,
    numReviews: product.numReviews,
    isFeatured: product.isFeatured,
  });
  if (!createdProduct)
    return {
      success: false,
      message: "An error was encountered while creating the product.",
    };
  createdProduct.save();
  return { success: true, message: "Product successfully created." };
}

async function update(id, product) {
  if (!mongoose.isValidObjectId(id))
    return { success: false, message: "Invalid product ID!!" };

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name: product.name,
      description: product.description,
      richDescription: product.richDescription,
      image: product.image,
      brand: product.brand,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
      rating: product.rating,
      numReviews: product.numReviews,
      isFeatured: product.isFeatured,
    },
    { new: true }
  );
  if (!updatedProduct)
    return { success: false, message: "Failed to update product" };
  return { success: true, product: product };
}

async function deleteById(id) {
  Product.findByIdAndRemove(id)
    .then((product) => {
      if (product)
        return { success: true, message: "Product successfully deleted" };
      else return { success: false, message: "Product not found!" };
    })
    .catch((err) => {
      return { success: false, message: err };
    });
}

async function getCount() {
  const productCount = await Product.countDocuments();
  if (!productCount)
    return { success: false, message: "An unexpected error was encountered." };
  return { success: true, productCount: productCount };
}

async function getFeatured() {
  const products = await Product.find({ isFeatured: true });
  if (!products)
    return { success: false, message: "An unexpected error was encountered." };
  return { success: true, products: products };
}

async function getByCategories(categories) {
  let filter = {};
  if (categories) {
    filter = { category: categories.split(",") };
  }
  const productList = await Product.find(filter);
  if (!productList)
    return { success: false, message: "An unexpected error was encountered." };
  return { success: true, productList: productList };
}

function fileUpload(req,res){
  try {
    singleFileUpload(req,res, function (error) {
      if (error) {
        return {success:false, message:error};
      } else {
        return {success: true, message: "Image successfully uploaded."};
      }
    });
  } catch (error) {
    return {success:false, message: error};
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  getCount,
  getFeatured,
  getByCategories,
  fileUpload
};
