const my = require("mysql2");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");

/* ---- LLamada al back de todos los servicios----- */
const servicios = (pool, req, callback) => {
  let query = `SELECT categoria.name as categoria,tiempo_estimado, precio,description, usuario.name as nombre,
  usuario.lastname as apellido, usuario.email,servicio.name as servicio 
  FROM publicacion 
  join usuario on publicacion.usuario_id = usuario.id
  join servicio on publicacion.servicio_id = servicio.id
  join categoria on categoria.id = categoria_id
  order by categoria.name asc`;
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;

      let response = result;
      callback(response)
      connection.release();
    });
  });
};

/* ---- LLamada al back de todos los usuarios----- */
const users = (pool, req, callback) => {
  let query = `SELECT username, email, name, lastname from usuario`;
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;

      let response = result;
      callback(response)
      connection.release();
    });
  });
};

const login = async (pool, req, callback) => {
  /*------- llamada al back con la condicion del email-----   */
  let { email, password } = req.body;
  const passwordHashed = await bcrypt.hash(password, 10);
  
  
  let query = `SELECT usuario.id,usuario.dni,usuario.username,usuario.name,usuario.lastname,usuario.password,usuario.email, usuario.phone, usuario.tipo_usuario_name,direccion.street as street, direccion.number, ciudad.name as city, pais.name as country FROM usuario 
  left join direccion on direccion.id = direccion_id
  left join ciudad on ciudad.zip_code = ciudad_zip_code
  left join pais on pais_name = pais.name
  where email ='${email}'`;
  // const match = await bcrypt.compare(password, dbResponse[0].password);
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, response) => {
      if (error) throw error;
      
      if(response.length > 0 ){
        bcrypt.compare(passwordHashed, response[0].password, (err, match) => {
          
          if (err) {
            let errorMess =  {
              message: 'contraseña incorrecta',
              status: httpStatus.UNAUTHORIZED,
            }
            callback(errorMess);
          }else{
            response[0].password = '';
            let okMess =  {
              message: 'login correcto',
              response:response
            }
            callback(okMess)
          }
        });
      }
      connection.release();
    });
  });
};

const register = async (pool, req, callback) => {
  /*------- llamada al back con la condicion del email-----   */
  let { userName, password, passwordConfirm, email, userType } = req.body;
  if (!(password === passwordConfirm)) return "Contraseñas Incorrectas";
  const passwordHashed = await bcrypt.hash(password, 10);
  console.log(password);

  // let responseId = await selectIdMax();
  let query = `INSERT INTO usuario (username,email,password,tipo_usuario_name)
              values("${userName}","${email}","${passwordHashed}","${userType}")`;

  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;

      responseId = result;
      callback(result);
      connection.release();
    });
  });
};


const insertCity = (pool,callback,body) => {
  let query = `INSERT INTO ciudad`;

  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;

      responseId = result;
      return responseId
      connection.release();
    });
  });
};

const viewCountry = (pool,callback,name) => {

  let query = `SELECT * FROM pais where name = '${name}'`;
  

  pool.getConnection((error, connection) => {
    if (error) throw error;
    
    connection.query(query, (error, result) => {
      if (error) {
        insertCountry(pool,callback,name)
        callback(false)};
      
      responseId = result;
      callback(responseId);
      connection.release();
    });
  });
}

const insertCountry = (pool,callback,name) => {

  
  let query = `INSERT INTO pais (name) values ("${name}") `;

  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;

      responseId = result;
      callback(responseId);
      connection.release();
      
    });
  });
};

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


const updateRegister = (pool,req, callback) => {
  
  /*------- llamada al back para traer Id más grande-----   */ 
  let { dni,name,lastName,phone } = req.body;
  let { direccion,calle,numero,cPostal,nameCiudad,namePais } = req.body;
  viewCountry(pool,callback,namePais)
  insertCity(pool,callback,direccion,calle,numero,cPostal,nameCiudad,namePais)

  let responseId;
  let query = `UPDATE usuario SET  `;
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;

      responseId = result;

      connection.release();
      return responseId;
    });
  });
};

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
  servicios,
  login,
  register,
  users,
};
