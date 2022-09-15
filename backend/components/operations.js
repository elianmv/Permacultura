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
      
      
      connection.release();
    });
  });
}

const login = (pool,req, callback) => {
  let { email, password } = req.body;
  let query = `SELECT * FROM usuario where email = '${email}'`;

  pool.getConnection((error, connection) => {
    if (error) throw error;
    
    connection.query(query, (error, result) => {
      if (error) throw error;
      
      let response = result;
      console.log(response.length)
      if(response.length > 0 ){
        console.log(response)
        console.log(password)
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
