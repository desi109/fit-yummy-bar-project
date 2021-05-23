const {Order} = require('../models/order');
const express = require('express');
const {OrderItem} = require('../models/order-item');
const router = express.Router();


// GET order of a user from exact date
// http://localhost:3000/api/v1/orders
router.get(`/`, async (req, res) =>{
    const orderList = await Order.find().populate('name').sort({'dateOrdered': -1});

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.send(orderList);
})


// GET order by ID
// http://localhost:3000/api/v1/orders/6055a6a8eafaa314670475cf
router.get(`/:id`, async (req, res) =>{
    const order = await Order.findById(req.params.id)
    .populate('name')
    .populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        });

    if(!order) {
        res.status(500).json({success: false});
    } 
    res.send(order);
});


// POST (create) a new order 
// http://localhost:3000/api/v1/orders
router.post('/', async (req,res)=>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        });

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved =  await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
    }));

    const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress: req.body.shippingAddress,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user
    })
    order = await order.save();

    if(!order)
    return res.status(400).send('The order cannot be created!');

    res.send(order);
});


// POST (edit/update) the order
// http://localhost:3000/api/v1/orders/6055a6a8eafaa314670475cf
router.put('/:id',async (req, res)=> {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    );

    if(!order)
    return res.status(400).send('The order cannot be update!');

    res.send(order);
});


// DELETE order by ID
// http://localhost:3000/api/v1/orders/6055a6a8eafaa314670475cf
router.delete('/:id', (req, res)=>{
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem);
            })
            return res.status(200).json({success: true, message: 'The order is deleted!'});
        } else {
            return res.status(404).json({success: false , message: 'The order was not found!'});
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err});
    })
});


// GET price of all orders (total sales price)
// http://localhost:3000/api/v1/orders/get/totalsales
router.get('/get/totalsales', async (req, res)=> {
    const totalSales= await Order.aggregate([
        { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
    ]);

    if(!totalSales) {
        return res.status(400).send('The total sales price cannot be generated!');
    }

    res.send({totalsales: totalSales.pop().totalsales});
});


// GET number of all orders
// http://localhost:3000/api/v1/orders/get/count
router.get(`/get/count`, async (req, res) =>{
    const orderCount = await Order.countDocuments((count) => count)

    if(!orderCount) {
        res.status(500).json({success: false});
    } 
    res.send({
        orderCount: orderCount
    });
});


// GET number of all orders of a user
// http://localhost:3000/api/v1/orders/get/userorders/6055a6a8eafaa314670475cf
router.get(`/get/userorders/:userid`, async (req, res) =>{
    const userOrderList = await Order.find({user: req.params.userid}).populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        }).sort({'dateOrdered': -1});

    if(!userOrderList) {
        res.status(500).json({success: false});
    } 
    res.send(userOrderList);
});



module.exports = router;
