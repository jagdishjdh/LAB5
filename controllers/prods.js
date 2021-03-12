const Prod = require('../models/prod')

exports.get_prods = async (req, res, next)=>{
    try{    
        let products = await Prod.get_all();
        res.render('user/prods', {
            pageTitle: "All Products",
            path: '/prods',
            products: products.rows,
        });
    }catch(e){
        console.log("Error: get_prods: ", e.message)
    }
}
