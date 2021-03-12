const Cart = require('../models/cart')
const Prod = require('../models/prod')
const Order = require('../models/order');
const User = require('../models/user');

exports.get_orders = async (req, res, next)=>{
    try{
        let orders = await Order.get_all();
        res.render('user/orders', {
            pageTitle: "Orders",
            path: '/orders',
            orders: orders.rows,
        });
    }catch(e){
        console.log("Error: get_orders: ", e.message)
    }
}

exports.buy = async (req, res, next) =>{
    // place order of all items in cart
    // check that total cost of all items is <= credit available
    // quantity if each item must be <= available item
    // decrement user credit
    // clear cart
    try{
        let userid = User.get_user_id();
        await Cart.checkout(userid);
        res.redirect('/orders');
    }catch(e){
        console.log("Error: buy : ", e.message)
        res.redirect('/cart');
    }
}