const mongoose = require('mongoose');
 
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            size: { type: String, default: 'M' }
        }
    ],
    totalAmount: { type: Number, required: true },
    deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    orderStatus: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    orderDate: { type: Date, default: Date.now }
});
 
const Order = mongoose.model('Order', orderSchema);
 
module.exports = Order;