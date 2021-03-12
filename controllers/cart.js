const Cart = require('../models/cart')
const Prod = require('../models/prod');
const User = require('../models/user');

exports.get_cart = async (req, res, next)=>{
    try{
        let cart_items = await Cart.get_all();
        let user = await User.get_user(User.get_user_id());
        res.render('user/cart', {
            pageTitle: "Cart",
            path: '/cart',
            items: cart_items.rows,
            credit: user.rows[0]["credit"]
        });
    }catch(e){
        console.log("Error: get_cart: ", e.message)
    }
}

exports.post_cart = async (req, res, next)=>{
    try{
        let {itemid} = req.body;
        let newCartItem = new Cart(User.get_user_id(), Number(itemid), 1); // quantity is hardcoded to 1 
        await newCartItem.add_to_cart();
        res.redirect('/cart');
    }catch(e){
        console.log("Error: post_cart: ", e.message)
        res.redirect('/prods');
    }
}

exports.remove_item_from_cart = async (req, res, next)=>{
    try{
        let itemid = req.params.id;
        await Cart.delete_one(User.get_user_id(), itemid);
    }catch(e){
        console.log("Error: remove_item_from_cart: ", e.message)
    }finally{
        res.redirect('/cart');
    }
}