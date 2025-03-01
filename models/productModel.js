const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Product name
    price: { type: Number, required: true }, // Product price
    description: { type: String, required: true }, // Product description
    category: { type: String, required: true }, // Product category (e.g., "Clothing")
    stock: { type: Number, required: true }, // Available stock
    image: { type: String, required: true }, // Product image URL
    rating: { type: Number, default: 0 }, // Product rating (out of 5)
    wishlist: { type: Boolean, default: false }, // Wishlist status
    addToCart: { type: Boolean, default: false } // Add to cart status
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
