const mongoose = require('mongoose');
const Cart = require('../models/cartModel')

const orderHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        required: true,
    },
    items: {
        type: mongoose.Schema.Types.Array,
        ref: 'cart',
        required: true,
    },
    itemsTotalValue: {
        type: mongoose.Schema.Types.Number,
        ref: 'cart'
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    },
})

module.exports = mongoose.model('OrderHistory', orderHistorySchema);