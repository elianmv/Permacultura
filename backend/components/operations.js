const my = require("mysql2");
const httpStatus = require('http-status');
const bcrypt = require("bcryptjs");



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

const login = async (pool,req, callback) => {
  
  /*------- llamada al back con la condicion del email-----   */ 
  let { email, password } = req.body;
  
  let query = `SELECT * FROM usuario where email = '${email}'`;
  // const match = await bcrypt.compare(password, dbResponse[0].password);
  pool.getConnection((error, connection) => {
    if (error) throw error;
    
    connection.query(query, (error, result) => {
      if (error) throw error;
      
      let response = result;
      
      if(response.length > 0 ){
        bcrypt.compare(password, response[0].password, (err, match) => {
          if (err) {
            let errorMess =  {
              message: 'contraseña incorrecta',
              status: httpStatus.UNAUTHORIZED,
            }
            callback(errorMess);
          }else{
            let okMess =  {
              message: 'login correcto'
            }
            callback(okMess)
          }
        });
      }
      connection.release();
    });
  });
};


const register = async (pool,req, callback) => {
  
  /*------- llamada al back con la condicion del email-----   */ 
  let { userName, password, passwordConfirm, email, userType} = req.body;    
  if(!(password === passwordConfirm)) return 'Contraseñas Incorrectas'
  const passwordHashed = await bcrypt.hash(password, 10);
  console.log(password)

  // let responseId = await selectIdMax();
  let query = `INSERT INTO usuario (username,email,password,tipo_usuario_name)
              values("${userName}","${email}","${passwordHashed}","${userType}")`;

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


// const insertCity = (body) => {
//   let query = `INSERT INTO ciudad`;

//   pool.getConnection((error, connection) => {
//     if (error) throw error;
    
//     connection.query(query, (error, result) => {
//       if (error) throw error;
      
//       responseId = result;
      
//       connection.release();
//     });
//   });
// }

// const insertTypeUser = (body) => {
//   let query = `INSERT INTO tipo_usuario`;

//   pool.getConnection((error, connection) => {
//     if (error) throw error;
    
//     connection.query(query, (error, result) => {
//       if (error) throw error;
      
//       responseId = result;
      
//       connection.release();
//     });
//   });
// }


// const selectIdMax = (pool,req, callback) => {
  
//   /*------- llamada al back para traer Id más grande-----   */ 

//   let responseId;
//   let query = `SELECT MAX(usuario.id) FROM usuario`;
//   pool.getConnection((error, connection) => {
//     if (error) throw error;
    
//     connection.query(query, (error, result) => {
//       if (error) throw error;
      
//       responseId = result;
      
//       connection.release(); 
//       return responseId
//     });
//   });
// };

// const insertTypeUsuario = (pool,req, callback) => {
  
//   /*------- Insert in tabla de tipo de usuario-----   */ 

//   let { idUsuarioType } = req.body
//   let query = `SELECT MAX(usuario.id) FROM usuario`;
//   pool.getConnection((error, connection) => {
//     if (error) throw error;
    
//     connection.query(query, (error, result) => {
//       if (error) throw error;
      
//       responseId = result;
      
//       connection.release();
//       return responseId
//     });
//   });
// };




module.exports = {
  servicios,login,register
};
