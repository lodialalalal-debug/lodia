const User = require("./model");
const Product = require("./model2");

async function getUsers() {
    return await User.find();
}

async function getProducts() {
    return await Product.find();
}

module.exports = {
    getUsers,
    getProducts
};
