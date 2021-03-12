const Prod = require('../models/prod');


exports.get_addProduct = (req,res,next) => {
    try{
        res.render('admin/add_product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false
        });
    }catch(e){
        console.log("Error: get_addProduct: ", e.message);
    }
};

exports.post_addProdduct = async (req,res,next) => {
    try{
        const title = req.body.title;
        const image = req.body.image
        const price = Number(req.body.price);
        const quantity = Number(req.body.quantity);
        if(title == ""){
            throw Error("Product name can't be empty")
        }
        if(price < 0 || quantity < 0){
            throw Error("price or quantity is < 0")
        }
        const product = new Prod( title, image, price,quantity);
        await product.add_prod();
        
    }catch(e){
        console.log("Error: post_addProduct: ", e.message);
    }finally{
        res.redirect("/admin/add-product");
    }
};