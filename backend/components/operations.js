const my = require("mysql2");

const getAll = (pool, callback) => {
  let query = "SELECT * FROM usuarios";

  pool.getConnection((error, connection) => {
    if (error) throw error;
    
    connection.query(query, (error, results) => {
      if (error) throw error;
      callback(results);

      connection.release();
    });
  });
};

module.exports = {
  getAll,
};
