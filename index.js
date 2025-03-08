// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const userRoutes = require("./routes/userRoutes");
// const productRoutes = require("./routes/productRoutes");  // ✅ Import product routes

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors()); // Allowing all origins for local testing

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // Routes
// app.use("/users", userRoutes);
// app.use("/products", productRoutes);  // ✅ Register product routes

// // Root Route (Health Check)
// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allowing all origins for local testing

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/addresses", addressRoutes);
app.use("/orders", orderRoutes);

// Root Route (Health Check)
app.get("/", (req, res) => {
  res.status(200).json({ message: "🚀 Server is running!" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.message);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
