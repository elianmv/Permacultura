const my = require('mysql2');

require('dotenv').config();



const pool = my.createPool({
    host:process.env.DBSERVER_URL,
    database:process.env.DB_NAME,
    port:process.env.DBSERVER_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD
});
pool.getConnection(error => {
    if(error) throw error;
    console.log('conexiòn exitosa')
});

module.exports = {
    pool
}