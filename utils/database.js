const { Pool } = require('pg');

const pool = new Pool({
    user: 'jagdish',     //your postgres username
    host: 'localhost', 
    database: 'lab5eshop', //your local database 
    password: 'jagdish', //your postgres user password
    port: 5432, //your postgres running port
});

pool.connect()
.then(()=>console.log("connected to database"))
.catch(e=>{
    console.log("Error connecting to database: ",e.message);
});


module.exports = pool;