const pool= require('../utils/database');

module.exports = class Order{

    constructor( userid, itemid, quantity){
        this.userid = userid;
        this.itemid = itemid;
        this.quantity = quantity;
    }

    // add_order(){
    //     return pool.query('INSERT INTO orders(user_id, item_id, quantity) VALUES ($1, $2, $3);', [this.userid, this.itemid, this.quantity]);
    // }
    static get_all(){
        return pool.query('SELECT p.id, p.title, p.image, p.price, o.quantity \
                FROM orders o inner join products p on(o.item_id = p.id)\
                ORDER BY title');
    }

};