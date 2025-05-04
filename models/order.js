
const mongoose = require('mongoose');
const orderSchema= new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            status: {
                type: Number,
                required: true
            },
            totalAmount: {
                type: Number,
                required: true
            },
        }
    ],
})
module.exports = mongoose.model('Order', orderSchema);