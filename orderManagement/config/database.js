const { createPool} = require('mysql2');

const Pool= createPool({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.MYSQL_DB
})


Pool.query('select * from order_placement.order',(err,result,fields)=>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
})

module.exports=Pool;
