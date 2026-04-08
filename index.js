const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const data = require("./data");
const User = require("./model");

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// DATABASE CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/testDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// HOME ROUTE
app.get("/", (req, res) => {
    res.send("Server Running");
});

// GET USERS
app.get("/users", async(req, res) => {
    const users = await data.getUsers();
    res.json(users);
});

// GET PRODUCTS
app.get("/products", async(req, res) => {
    const products = await data.getProducts();
    res.json(products);
});

// SIGNUP
app.post("/signup", async(req, res) => {
    try {
        // check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
app.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (user) {
            res.json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SERVER
app.listen(3000, () => {
    console.log("Server running on port 3000");
});