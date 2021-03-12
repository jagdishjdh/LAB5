
const pool= require('../utils/database');
module.exports = class Prod{

    constructor( title, image, price, quantity){
        this.title = title;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }

    add_prod(){
        return pool.query('INSERT INTO products(title, price, image, quantity) VALUES ($1, $2, $3, $4);', [this.title, this.price, this.image, this.quantity]);
    }
    static get_all(){
        return pool.query('SELECT * FROM products ORDER BY title');
    }
    static get_one(id){
        return pool.query('SELECT * FROM products where id = $1', [id]);
    }
    static reduce_quantity_by(id, q){
        return pool.query('UPDATE products SET quantity = quantity - $1 WHERE id = $2', [q,id]);
    }
};