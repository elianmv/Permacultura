const my = require("mysql2");
const responseHttp = require("../utils/response");
const bcrypt = require("bcryptjs");
const { viewCountry,viewCity,insertDireccion } = require("./secundaryOperation")

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
  let query = `SELECT * FROM usuario`;
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;
      
      callback(responseHttp.responseOk(result))
      connection.release();
    });
  });
};

const cities = (pool, req, callback) => {
  let { country } = req.params;
  console.log(country)
  let query = `select name FROM ciudad 
  WHERE pais_name ='${country}'`;
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;
      
      callback(responseHttp.responseOk(result))
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





const updateRegister =  (pool,req, callback) => {
  
  /*------- llamada al back para traer Id más grande-----   */ 
  let { dni,name,lastName,phone } = req.body;
  let { direccion,calle,numero,cPostal,nameCiudad,namePais } = req.body;
  let ciudad = {
    nameCiudad,cPostal,namePais
  }
  let direcPerson = {
    cPostal,calle,numero
  }

  insertDireccion(pool,direcPerson).then(resp => {
    if(resp.message === 'Creado'){
      let idDireccion = resp.response.insertId;
      let query = `UPDATE usuario SET 
                    lastname = "${lastName}",
                    name = "${name}",
                    phone = "${phone}",
                    direccion_id = "${idDireccion}"
                    WHERE email = "${email}"`;

        pool.getConnection((error, connection) => {
          if (error) throw error;

          connection.query(query, (error, result) => {
            if (error) throw error;

            callback(responseHttp.responseCreated('Usuario Creado'));
            connection.release();
          });
        });
      
    }
  }).catch(err => {
    callback(err)
  })

  // Promise.All([viewCountry(pool,namePais,callback),
  //   viewCity(pool,ciudad,callback),
  //   insertDireccion(pool,direcPerson,callback)]).then(res => {
  //   console.log(err)
  // }).catch(err => {
  //   console.log(err)
  // })

  
 
  
};

// const insertDireccion = (pool,req,callback) => {
  
//   let { cPostal,calle,numero } = req;
  
//   let query = `INSERT INTO direccion ('street','number','ciudad_zip_code')
//                values ("${calle},${parseInt(numero)},${parseInt(cPostal)}") `;

//   pool.getConnection((error, connection) => {
//     if (error) reject(error);

//     connection.query(query, (error, result) => {
//       if (error) reject(error);
      
//       resolve(responseHttp.responseCreated('Creado'));
//       connection.release();
      
//     });
//   })
  
// };
//-------------------//
//****  DELETE  ******//
//_________________//

const deletePerson = (pool, req, callback) => {
  let { email } = req.params;
  console.log(email)
  let query = `DELETE FROM usuario 
  WHERE email ='${email}'`;
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;
      
      callback(responseHttp.responseOkMess(result,'Registro Borrado con Éxito'))
      connection.release();
    });
  });
};

const deleteService = (pool, req, callback) => {
  let { id } = req.params;

  let query = `DELETE FROM publicacion 
    WHERE id ='${id}'`;
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;
      
      callback(responseHttp.responseOkMess(result,'Registro Borrado con Éxito'))
      connection.release();
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
  persons,
  updateRegister,
  deletePerson,
  deleteService,
  cities
};
