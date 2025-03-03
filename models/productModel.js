const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number }, // ✅ Discounted Price
  images: [{ type: String, required: true }], // Array of Image URLs
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 }, // ✅ Rating out of 5
  reviews: { type: Number, default: 0 }, // ✅ Number of reviews
  sizes: [{ type: String, enum: ["XS", "S", "M", "L", "XL", "XXL"] }], // ✅ Available Sizes
});

module.exports = mongoose.model("Product", productSchema);
