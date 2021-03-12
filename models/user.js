const pool= require('../utils/database');

module.exports = class User{

    constructor( userid, name, password, email, credit){
        this.userid = userid;
        this.name  = name;
        this.password  = password;
        this.email  = email;
        this.credit  = credit;
    }

    static get_user_id(){
        // let res = await User.get_all();
        // return res.rows[0]['user_id'];
        return 1;
    }

    static get_user(id){
        return pool.query('SELECT * FROM users where user_id = $1', [id]);
    }

    static deduct_credit(id, amt){
        return pool.query('UPDATE users SET credit = credit - $1  WHERE user_id = $2', [amt, id]);
    }

    static get_all(){
        return pool.query('SELECT * FROM users');
    }
};