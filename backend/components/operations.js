const my = require("mysql2");
const httpStatus = require('http-status')



/* ---- LLamada al back de todos los servicios----- */
const servicios = (pool,req, callback) => {
  let query = `SELECT tiempo_estimado, precio,description, usuario.name as nombre, 
                usuario.lastname as apellido, usuario.email,servicio.name as servicio 
                FROM publicacion 
                join usuario on publicacion.usuario_id = usuario.id
                join servicio on publicacion.servicio_id = servicio.id`;
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
        
        callback(result)
      }else{
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

const register = (pool,req, callback) => {
  
  /*------- llamada al back con la condicion del email-----   */ 
  let { userName,name,lastName, email, password,address,phone,typeUser,dni,country, city } = req.body;
  console.log(req.body)
  let response;
  let query = `SELECT MAX(usuario.id) FROM usuario`;

  pool.getConnection((error, connection) => {
    if (error) throw error;
    
    connection.query(query, (error, result) => {
      if (error) throw error;
      
      response = result;

      connection.release();
    });
  });
};

module.exports = {
  servicios,login,register
};
