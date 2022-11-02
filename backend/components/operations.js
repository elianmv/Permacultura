const my = require("mysql2");
const responseHttp = require("../utils/response");
const bcrypt = require("bcryptjs");
const { viewCountry,viewCity,insertDireccion } = require("./secundaryOperation")

/* ---- LLamada al back de todos los servicios----- */
const publicaciones = (pool, req, callback) => {
  let query = `SELECT publicacion.id, categoria.name as categoria,tiempo_estimado, precio,description, usuario.name as nombre,
  usuario.lastname as apellido, usuario.email,servicio.name as servicio 
  FROM publicacion 
  join usuario on publicacion.usuario_id = usuario.id
  join servicio on publicacion.servicio_id = servicio.id
  join categoria on categoria.id = categoria_id
  order by categoria.name asc`;
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) callback(responseHttp.responseError("Bad Request"));
      if(!result.length > 0){
        callback(responseHttp.responseNoContent('Ningún Servicio Encontrado',result))
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
      if (error) callback(responseHttp.responseError("Bad Request"));
      
      callback(responseHttp.responseOk(result))
      connection.release();
    });
  });
};

const services = (pool, req, callback) => {
  let query = `SELECT id ,name FROM servicio`;
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) callback(responseHttp.responseError("Bad Request"));
      
      callback(responseHttp.responseOk(result))
      connection.release();
    });
  });
};

const editService = (pool, req, callback) => {
  let { id } = req.params;
  let query = `SELECT * FROM publicacion where id = ${id}`;
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) callback(responseHttp.responseError("Bad Request"));
      
      callback(responseHttp.responseOk(result))
      connection.release();
    });
  });
};

const cities = (pool, req, callback) => {
  let { country } = req.params;

  let query = `select zip_code,name FROM ciudad 
  WHERE pais_name ='${country}'`;
  pool.getConnection((error, connection) => {
    if (error) callback(responseHttp.responseError("Bad Request"));

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
      if (error) callback(responseHttp.responseError("Bad Request"));

      
      callback(responseHttp.responseOk(result))
      connection.release();
    });
  });
};

const provServicios = (pool, req, callback) => {
  let { email} = req.params;
  let query = `SELECT servicio.name, publicacion.id, publicacion.precio, publicacion.description from publicacion 
  join usuario on  usuario_id = usuario.id
  join servicio on  servicio_id = servicio.id
  where usuario.email = '${email}' `;
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) callback(responseHttp.responseError("Bad Request"));

      
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
      if (error) callback(responseHttp.responseError("Bad Request"));
      
      
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
      
      
      if (error) callback(responseHttp.responseError("Bad Request"));
      if (result) callback(responseHttp.responseCreated('Usuario Creado'));
     
      connection.release();
    });
  });
};


const servicesCreate = async (pool, req, callback) => {
  /*------- llamada al back con la condicion del email-----   */
  
  let { servicio, tiempo, precio, emailUser, descripcion } = req.body;
  
 
  let query = `SELECT usuario.id  FROM usuario 
  where email ='${emailUser}'`;

  pool.getConnection((error, connection) => {
    if (error) callback(responseHttp.responseError("Bad Request"));

    connection.query(query, (error, result) => {
      if (error) callback(responseHttp.responseError("Bad Request"));
      let objPerson = {
        idPerson:'',
        servicio, 
        tiempo, 
        precio, 
        emailUser, 
        descripcion
      };
     if(result){
        objPerson.idPerson = result[0].id;
        
        createServiceOfPerson(pool,objPerson, callback)};
      connection.release();
    });
  });
};

const createServiceOfPerson = async (pool, req, callback) => {
  /*------- llamada al back con la condicion del email-----   */
  
  // let { idPerson ,servicio, tiempo, precio, descripcion } = req.body;

 
  let query = `insert into publicacion (tiempo_estimado, precio, usuario_id, servicio_id, description) 
  values ('${req.tiempo}', '${req.precio}', '${req.idPerson}', '${req.servicio}', '${req.descripcion}');`;

  pool.getConnection((error, connection) => {
    if (error) callback(responseHttp.responseError("Bad Request"));
 
    connection.query(query, (error, result) => {
      if (error) callback(responseHttp.responseError("Bad Request"));
      
      if (result) callback(responseHttp.responseCreated('Servicio Creado'));
      connection.release();
    });
  });
};


const updateRegister =  (pool,req, callback) => {
  console.log(req.body)
  let { emailUser } = req.params
  /*------- llamada al back para traer Id más grande-----   */ 
  let { dni,name,lastName,phone } = req.body;
  let { direccion,street,number,cPostal,city,country } = req.body;
  let ciudad = {
    city,cPostal,country
  }
  let direcPerson = {
    cPostal,street,number
  }

  insertDireccion(pool,direcPerson).then(resp => {
    console.log(resp)
    if(resp.message === 'Creado'){
      let idDireccion = resp.response.insertId;
      let query = `UPDATE usuario SET 
                    dni = "${dni}",
                    lastname = "${lastName}",
                    name = "${name}",
                    phone = "${phone}",
                    direccion_id = "${idDireccion}"
                    WHERE email = "${emailUser}"`;
                console.log(idDireccion, dni, name, lastName, phone,  emailUser)
        pool.getConnection((error, connection) => {
          if (error) callback(responseHttp.responseError("Bad Request"));

          connection.query(query, (error, result) => {
            if (error) throw error;
            console.log(result)
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

  let query = `DELETE FROM usuario 
  WHERE email ='${email}'`;
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) callback(responseHttp.responseError("Bad Request"));
      
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
      if (error) callback(responseHttp.responseError("Bad Request"));
      
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
  services,
  login,
  register,
  persons,
  updateRegister,
  deletePerson,
  deleteService,
  cities,
  provServicios,
  publicaciones,
  editService,
  servicesCreate
};
