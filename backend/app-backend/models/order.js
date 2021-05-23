const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
    }],
    shippingAddress: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: Number,
    },
    /*user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },*/
    user: {
        type: String,
        required: true
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
})

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

exports.Order = mongoose.model('Order', orderSchema);



/**
Order Example:
{
    "orderItems" : [
        {
            "quantity": 3,
            "product" : "6055a6a8eafaa314670475cf"
        },
        {
            "quantity": 2,
            "product" : "6055a6a8eafaa314670475ss"
        }
    ],
    "shippingAddress" : "Plovdiv, ul. Vitinq 23",
    "phone": "0895864306",
    "user": "5fd51bc7e39ba856244a3b44"
}
 */
