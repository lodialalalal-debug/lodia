const express = require("express");
const mongoose = require("mongoose");
const data = require("./data");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/testDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Server Running");
});

app.get("/users", async (req, res) => {
    const users = await data.getUsers();
    res.json(users);
});

app.get("/products", async (req, res) => {
    const products = await data.getProducts();
    res.json(products);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});