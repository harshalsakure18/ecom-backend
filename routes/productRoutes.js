const express = require('express');
const Product = require('../models/productModel'); // Import the product model
const router = express.Router();

// ✅ Add a new product (Clothing)
router.post('/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ✅ Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get a single product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update a product by ID
router.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete a product by ID
router.delete('/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Add/Remove product from Wishlist
router.patch('/products/:id/wishlist', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        product.wishlist = !product.wishlist; // Toggle wishlist status
        await product.save();
        res.json({ message: "Wishlist updated", wishlist: product.wishlist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Add/Remove product from Cart
router.patch('/products/:id/cart', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        product.addToCart = !product.addToCart; // Toggle addToCart status
        await product.save();
        res.json({ message: "Cart updated", addToCart: product.addToCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
