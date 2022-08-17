const my = require("mysql2");
const httpStatus = require('http-status')

const login = (pool,req, callback) => {
  let { username, password } = req.body;
  let query = `SELECT * FROM usuarios where email = '${username}'`;

  pool.getConnection((error, connection) => {
    if (error) throw error;
    
    connection.query(query, (error, result) => {
      if (error) throw error;
      
      let response = result;
      console.log(response.length)
      if(response.length > 0 ){
        console.log(response)
        console.log(password)
      if(response[0].password === parseInt(password)){
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
          console.log('conraseña incorrecta')
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
  login,
};
