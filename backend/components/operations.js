const my = require("mysql2");
const httpStatus = require('http-status');
const { hashear } = require('./hashPassword')



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


const register = async (pool,req, callback) => {
  
  /*------- llamada al back con la condicion del email-----   */ 
  let { userName, password, passwordConfirm, email, userType} = req.body;    
  if(!(password === passwordConfirm)) return 'Contraseñas Incorrectas'
  password = hashear(password);

  // let responseId = await selectIdMax();
  let query = `INSERT INTO usuario (username,email,password,tipo_usuario_name)
              values("${userName}","${email}","${password}","${userType}")`;

  pool.getConnection((error, connection) => {
    if (error) throw error;
    
    connection.query(query, (error, result) => {
      if (error) throw error;
      
      responseId = result;
      callback(result)
      connection.release();
    });
  });
};


const insertCity = (body) => {
  let query = `INSERT INTO ciudad`;

  pool.getConnection((error, connection) => {
    if (error) throw error;
    
    connection.query(query, (error, result) => {
      if (error) throw error;
      
      responseId = result;
      
      connection.release();
    });
  });
}

const insertTypeUser = (body) => {
  let query = `INSERT INTO tipo_usuario`;

  pool.getConnection((error, connection) => {
    if (error) throw error;
    
    connection.query(query, (error, result) => {
      if (error) throw error;
      
      responseId = result;
      
      connection.release();
    });
  });
}


const selectIdMax = (pool,req, callback) => {
  
  /*------- llamada al back para traer Id más grande-----   */ 

  let responseId;
  let query = `SELECT MAX(usuario.id) FROM usuario`;
  pool.getConnection((error, connection) => {
    if (error) throw error;
    
    connection.query(query, (error, result) => {
      if (error) throw error;
      
      responseId = result;
      
      connection.release(); 
      return responseId
    });
  });
};

const insertTypeUsuario = (pool,req, callback) => {
  
  /*------- Insert in tabla de tipo de usuario-----   */ 

  let { idUsuarioType } = req.body
  let query = `SELECT MAX(usuario.id) FROM usuario`;
  pool.getConnection((error, connection) => {
    if (error) throw error;
    
    connection.query(query, (error, result) => {
      if (error) throw error;
      
      responseId = result;
      
      connection.release();
      return responseId
    });
  });
};




module.exports = {
  servicios,login,register
};
