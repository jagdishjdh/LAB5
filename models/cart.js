const pool= require('../utils/database');
const Prod = require('./prod')
const User = require('./user')

module.exports = class Cart{

    constructor( userid, itemid, quantity){
        this.userid = userid;
        this.itemid = itemid;
        this.quantity = quantity;
    }

    // add new item to cart 
    // check if stated quantity is available and 
    // reduce from total quantity
    async add_to_cart(){
        let item = await Prod.get_one(this.itemid);
        // check if product has enough quantity
        if( (item.rowCount > 0) && (this.quantity > 0) && (item.rows[0]['quantity'] >= this.quantity) ){
            await pool.query('INSERT INTO cart(user_id, item_id, quantity) VALUES ($1, $2, $3)\
                ON CONFLICT (user_id, item_id)\
                DO UPDATE SET quantity = cart.quantity + excluded.quantity;', [this.userid, this.itemid, this.quantity]);
            // now decrease quantity from products table
            await Prod.reduce_quantity_by(this.itemid, this.quantity);
        }else{
            throw Error("Either item or enough quantity of the item is not available");
        }
    }
    static async delete_one(uid,iid){
        await pool.query("UPDATE products SET quantity = quantity + \
                    (select quantity from cart where user_id = $1 and item_id = $2)\
                    where id = $2", [uid, iid]);
        await pool.query("DELETE FROM cart WHERE user_id = $1 and item_id = $2", [uid, iid]);
    }

    static get_all(){
        return pool.query('SELECT p.id, p.title, p.image, p.price, c.quantity \
            FROM cart c inner join products p on(c.item_id = p.id)\
            ORDER BY p.title');
    }

    static async checkout(userid){
        let user = (await User.get_user(userid)).rows[0];
        let cart_prod = await pool.query("SELECT c.user_id, c.item_id, c.quantity as q_ord, p.quantity as q_avail, (c.quantity*p.price) as price\
            FROM cart as c, products as p WHERE\
            c.user_id = $1 and\
            c.item_id = p.id", [userid]);

        let totalPrice = 0;
        // check if required quantity is available
        for(let i=0; i<cart_prod.rowCount; i++){
            let row = cart_prod.rows[i]
            if(row['q_ord'] > row['q_avail']){
                throw Error("required quantity is not available");
            }
            totalPrice += Number(row['price']);
        }
        // now check if credit is enough
        if( isNaN(totalPrice) || totalPrice > user['credit'] ){
            throw Error("credit is not sufficient");
        }
        // place orders
        await pool.query("INSERT INTO orders\
            SELECT * FROM cart\
            WHERE cart.user_id = $1\
            ON CONFLICT (user_id, item_id)\
            DO UPDATE SET quantity = orders.quantity + excluded.quantity", [userid]);

        // deduct from user's credit
        await User.deduct_credit(userid, totalPrice);

        // clear the cart
        await pool.query("DELETE FROM cart WHERE user_id = $1", [userid])
    }

};