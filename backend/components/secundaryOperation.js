const my = require("mysql2");
const responseHttp = require("../utils/response");

const viewCountry =  (pool,req,callback) => {

    return new Promise((resolve, reject) => {
        let name  = req
    let query = `SELECT * FROM pais where name = '${name}'`;
    
  
    pool.getConnection((error, connection) => {
      if (error) throw error;
      
      connection.query(query,  (error, result) => {
        if (error) callback(responseHttp.responseError(error));
        
        if(!result.legth > 0){
          let insert =  insertCountry(pool,name,callback)
          console.log(insert)
          resolve(true)
          
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
        
        callback(responseHttp.responseCreated('Creado'));
        connection.release();
        
      });
    });
  };

  //------------------------//
  //  View and Insert City //
  //-----------------------//

  const viewCity =  (pool,req,callback) => {

    return new Promise((resolve, reject) => {
        let { cPostal }  = req
    let query = `SELECT * FROM ciudad where zip_code = '${cPostal}'`;
    
  
    pool.getConnection((error, connection) => {
      if (error) throw error;
      
      connection.query(query,  (error, result) => {
        if (error) callback(responseHttp.responseError(error));
        
        if(!result.legth > 0){
          let insert =  insertCity(pool,req,callback)
          console.log(insert)
          resolve(true)
          
          }else{

            resolve(result)
          };
        connection.release();
      });
    });
    })
    
  }

  
    const insertCity = (pool,req,callback) => {
    let { cPostal,nameCiudad,namePais } = req;
    
    let query = `INSERT INTO ciudad ('zip_code','name','pais_name') 
    values ("${parseInt(cPostal)},${nameCiudad},${namePais}") `;
  
    pool.getConnection((error, connection) => {
      if (error) throw error;
  
      connection.query(query, (error, result) => {
        if (error) throw error;
        
        callback(responseHttp.responseCreated('Creado'));
        connection.release();
        
      });
    });
  };


  //------------------------//
  //  Insert Dirección     //
  //-----------------------//

  
  
  const insertDireccion = (pool,req) => {
    console.log(req)
    return new Promise((resolve, reject) => {
    let { city,street,number } = req;
    
    let query = `INSERT INTO direccion (street,number,ciudad_zip_code)
                 values ("${street}","${parseInt(number)}","${parseInt(city)}") `;
  
    pool.getConnection((error, connection) => {
      if (error) reject(error);
  
      connection.query(query, (error, result) => {
        if (error) reject(error);
        
        resolve(responseHttp.responseCreatedwithBody(result,'Creado'));
        connection.release();
        
      });
    })
    })
  };

module.exports = {
    viewCountry,
    viewCity,
    insertDireccion
}  