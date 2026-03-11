const mongoose = require("mongoose");
const productSchema = require("./schema2");

const Product = mongoose.model("Product", productSchema);

module.exports = Product;