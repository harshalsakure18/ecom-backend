const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
 
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

  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
 
// Routes

app.use("/users", userRoutes);
 
// Root Route (Health Check)

app.get("/", (req, res) => {

  res.send("Server is running!");

});
 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

 