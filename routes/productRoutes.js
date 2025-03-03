const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Create a new product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, discountPrice, images, stock, category, rating, reviews, sizes } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      discountPrice,
      images,
      stock,
      category,
      rating,
      reviews,
      sizes,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
});

module.exports = router;
