const my = require("mysql2");
const responseHttp = require("../utils/response");

const viewCountry = (pool,req,callback) => {

    return new Promise((resolve, reject) => {
        let name  = req
    let query = `SELECT * FROM pais where name = '${name}'`;
    
  
    pool.getConnection((error, connection) => {
      if (error) throw error;
      
      connection.query(query, async (error, result) => {
        if (error) callback(responseHttp.responseError(error));
        
        if(!result.legth > 0){
          let insert = await insertCountry(pool,name,callback)
          console.log(insert)
          resolve(true)
          // if(insert.message === 'Creado')callback(true);
          }else{

            resolve(result)
          };
        connection.release();
      });
    });
    })
    
  }

  const insertCountry = (pool,name,callback) => {
    console.log('insert',name)
    
    let query = `INSERT INTO pais (name) values ("${name}") `;
  
    pool.getConnection((error, connection) => {
      if (error) throw error;
  
      connection.query(query, (error, result) => {
        if (error) throw error;
        console.log('resultInsert',result)
        callback(responseHttp.responseCreated('Creado'));
        connection.release();
        
      });
    });
  };

module.exports = {
    viewCountry
}  