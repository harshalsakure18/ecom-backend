// const express = require('express');

// const router = express.Router();

// const Order = require('../models/orderModel');
 
// // Place an order

// router.post('/place', async (req, res) => {

//     const { userId, items, totalAmount, deliveryAddress } = req.body;

//     try {

//         const newOrder = new Order({

//             userId,

//             items,

//             totalAmount,

//             deliveryAddress

//         });

//         await newOrder.save();

//         res.status(201).json(newOrder);

//     } catch (error) {

//         res.status(500).json({ error: 'Failed to place order' });

//     }

// });
 
// // Get user orders

// router.get('/:userId', async (req, res) => {

//     try {

//         const orders = await Order.find({ userId: req.params.userId }).populate('items.productId').populate('deliveryAddress');

//         res.status(200).json(orders);

//     } catch (error) {

//         res.status(500).json({ error: 'Failed to fetch orders' });

//     }

// });
 
// module.exports = router;

const express = require("express");
const Order = require("../models/orderModel"); // Ensure this path is correct
const router = express.Router();

// Create Order
router.post("/", async (req, res) => {
    try {
        const { userId, items, totalAmount, deliveryAddress } = req.body;
    
        // Validate Required Fields
        if (!userId || !totalAmount || !deliveryAddress) {
          return res.status(400).json({ error: "All fields are required (userId, totalAmount, deliveryAddress)" });
        }
    
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});

// Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("userId deliveryAddress");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Order by ID
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate("userId deliveryAddress");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Order Status
router.patch("/:orderId", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { orderStatus: req.body.orderStatus },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Order
router.delete("/:orderId", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderId);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
