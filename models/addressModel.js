// const mongoose = require("mongoose");

// const addressSchema = new mongoose.Schema({
//     // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     fullName: { type: String, required: true },
//     street: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     zipCode: { type: String, required: true },
//     country: { type: String, required: true },
//     phone: { type: String, required: true }
// }, { timestamps: true });

// const Address = mongoose.model("Address", addressSchema);
// module.exports = Address;


const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    email: { type: String, required: true }, // Using email instead of userId
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
