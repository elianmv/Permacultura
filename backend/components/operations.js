const my = require("mysql2");
const responseHttp = require("../utils/response");
const bcrypt = require("bcryptjs");
const { viewCountry } = require("./secundaryOperation")

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
      if(!result.length > 0){
        callback(responseHttp.responseNoContent('Ningun Servicio Encontrado'))
      }else{
        callback(responseHttp.responseOk(result))
      };
      connection.release();
    });
  });
};


const persons = (pool, req, callback) => {
  let query = `SELECT * FROM usuario 
    WHERE tipo_usuario_name = 'cli' OR tipo_usuario_name = 'prov'`;
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;
      
      callback(responseHttp.responseOk(result))
      connection.release();
    });
  });
};

const login = async (pool, req, callback) => {
  /*------- llamada al back con la condicion del email-----   */
  let { email, password } = req.body;
  // const passwordHashed = await bcrypt.hash(password, 10);
  
  
  let query = `SELECT usuario.id,usuario.dni,usuario.username,usuario.name,usuario.lastname,usuario.password,usuario.email, usuario.phone, usuario.tipo_usuario_name,direccion.street as street, direccion.number, ciudad.name as city, pais.name as country FROM usuario 
  left join direccion on direccion.id = direccion_id
  left join ciudad on ciudad.zip_code = ciudad_zip_code
  left join pais on pais_name = pais.name
  where email ='${email}'`;
  
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, async (error, response) => {
      if (error) throw error;
      
      
      if(response.length > 0 ){
        const match = await bcrypt.compare(password, response[0].password);
          if (!match) {

            callback(responseHttp.responseUnauthorized('Contraseña Incorrecta'));
          }else{
            response[0].password = '';
            callback(responseHttp.responseOkLogin('Login Correcto',response))
          }
      }else{
        callback(responseHttp.responseNoContent('Usuario Desconocido'));
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
  
  let query = `INSERT INTO usuario (username,email,password,tipo_usuario_name)
              values("${userName}","${email}","${passwordHashed}","${userType}")`;

  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;

      callback(responseHttp.responseCreated('Usuario Creado'));
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

// const insertCountry = (pool,name,callback) => {
//   console.log('insert',name)
  
//   let query = `INSERT INTO pais (name) values ("${name}") `;

//   pool.getConnection((error, connection) => {
//     if (error) throw error;

//     connection.query(query, (error, result) => {
//       if (error) throw error;
//       console.log('resultInsert',result)
//       callback(responseHttp.responseCreated('Creado'));
//       connection.release();
      
//     });
//   });
// };



// const viewCountry = (pool,req,callback) => {
//   let name  = req
//   let query = `SELECT * FROM pais where name = '${name}'`;
  

//   pool.getConnection((error, connection) => {
//     if (error) throw error;
    
//     connection.query(query, async (error, result) => {
//       if (error) throw error;
//       console.log(result.length)
//       if(!result.legth > 0){
//         let insert = await insertCountry(pool,name,callback)
//         console.log(insert)
//         // if(insert.message === 'Creado')callback(true);
//         }else{
//           console.log(result)
//           callback(true)
//         };
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


const updateRegister = async (pool,req, callback) => {
  
  /*------- llamada al back para traer Id más grande-----   */ 
  let { dni,name,lastName,phone } = req.body;
  let { direccion,calle,numero,cPostal,nameCiudad,namePais } = req.body;
  
  viewCountry(pool,namePais,callback).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  });

  // if(vCountry)console.log('vCountry1',vCountry);
  // console.log('vCountry2',vCountry)
  
  // insertCity(pool,callback,direccion,calle,numero,cPostal,nameCiudad,namePais)

    // if(vCountry){
    //   let responseId;
    //   let query = `UPDATE usuario SET  `;
    //   pool.getConnection((error, connection) => {
    //     if (error) throw error;

    //     connection.query(query, (error, result) => {
    //       if (error) throw error;

    //       responseId = result;

    //       connection.release();
    //       return responseId;
    //     });
    //   });
    //   }
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
  persons,
  updateRegister
};
