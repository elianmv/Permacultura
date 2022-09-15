const my = require("mysql2");
const httpStatus = require('http-status')




const select = (pool,req, callback) => {
  let query = `SELECT * FROM usuario `;
  pool.getConnection((error, connection) => {
    if (error) throw error;
    
    connection.query(query, (error, result) => {
      if (error) throw error;
      
      let response = result;
      console.log(response)
      callback(response)
      
      connection.release();
    });
  });
}

const login = (pool,req, callback) => {
  
  /*------- llamada al back con la condicion del email-----   */ 
  let { email, password } = req.body;
  console.log('username',email)
  console.log('password',password)
  let query = `SELECT * FROM usuario where email = '${email}'`;

  pool.getConnection((error, connection) => {
    if (error) throw error;
    
    connection.query(query, (error, result) => {
      if (error) throw error;
      
      let response = result;
      console.log(response)
      if(response.length > 0 ){
       
      if(response[0].password === password){
        console.log('password correcto')
        callback(result)
      }else{
        console.log('conraseña incorrecta')
        let errorMess =  {
          message: 'contraseña incorrecta',
          status: httpStatus.UNAUTHORIZED,
        }
        callback(errorMess);
      } 
        }else{
         
          let errorMess =  {
            message: 'contraseña incorrecta',
            status: httpStatus.UNAUTHORIZED,
          }
          callback(errorMess);
        } 

      
      connection.release();
    });
  });
};

module.exports = {
  login,Register,
};
