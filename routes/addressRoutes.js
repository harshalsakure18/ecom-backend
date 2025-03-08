// const express = require('express');

// const router = express.Router();

// const Address = require('../models/addressModel');
 
// // Add new address

// router.post('/add', async (req, res) => {

//     const { userId, name, mobile, pincode, locality, address, city, state, landmark, alternatePhone, addressType } = req.body;

//     try {

//         const newAddress = new Address({

//             userId,

//             name,

//             mobile,

//             pincode,

//             locality,

//             address,

//             city,

//             state,

//             landmark,

//             alternatePhone,

//             addressType

//         });

//         await newAddress.save();

//         res.status(201).json(newAddress);

//     } catch (error) {

//         res.status(500).json({ error: 'Failed to add address' });

//     }

// });
 
// // Get user addresses

// router.get('/:userId', async (req, res) => {

//     try {

//         const addresses = await Address.find({ userId: req.params.userId });

//         res.status(200).json(addresses);

//     } catch (error) {

//         res.status(500).json({ error: 'Failed to fetch addresses' });

//     }

// });
 
// module.exports = router;

const express = require("express");
const Address = require("../models/addressModel");
const router = express.Router();

// ✅ POST: Add a new address for a user
router.post("/", async (req, res) => {
    try {
        const { userId, fullName, street, city, state, zipCode, country, phone } = req.body;

        // Validate required fields
        if (!userId || !fullName || !street || !city || !state || !zipCode || !country || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create new address
        const newAddress = new Address({ userId, fullName, street, city, state, zipCode, country, phone });
        await newAddress.save();

        res.status(201).json({ message: "Address added successfully", address: newAddress });
    } catch (error) {
        res.status(500).json({ message: "Error adding address", error });
    }
});

// ✅ GET: Fetch all addresses for a user
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const addresses = await Address.find({ userId });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching addresses", error });
    }
});

module.exports = router;
