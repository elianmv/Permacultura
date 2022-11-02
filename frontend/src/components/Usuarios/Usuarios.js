
import './Usuarios.css';
import { useState, useEffect } from 'react';
import {Table, Button} from 'reactstrap';

import { useAuthContext } from '../../context/AuthContext/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import Icon from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';
import Swal from 'sweetalert2'
import SwitchSelector from "react-switch-selector";

export function Usuarios() {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const auth = useAuthContext();
  const [passwordError, setPasswordError] = useState(false);

const [isDelete,setIsDelete]= useState ();
const [isAdd,setIsAdd]= useState ();
const [userToDelete,setuserToDelete]= useState ('');

const [userType, setuserType] = useState("cli");
const [userName, setUserName] = useState();
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [passwordConfirm, setPasswordConfirm] = useState();


const refreshView = () => {
  fetch(`http://127.0.0.1:8080/api/v1/person`) //full list of services 
  .then((response) => response.json())
  .then((data) => {
    console.log("usuarios",data)
    setIsLoaded(true);
    setUsers(data.response);
   
  })
  .catch((err) => {
    setIsLoaded(true);
    setError(err);
  });

}

const optionsAdmin = [
  {
    label: <span>Cliente</span>,
    value: "cli",
    selectedBackgroundColor: "#4DD632",
  },
  {
    label: "Proveedor",
    value: "prov",
    selectedBackgroundColor: "#27AE60",
  },
  {
    label: "Admin",
    value: "admin",
    selectedBackgroundColor: "#1E8449",
  },
];

const onChangeNew = (newValue) => {
  setuserType(newValue);
};


const initialSelectedIndexNew = optionsAdmin.findIndex(
  ({ value }) => value === "cli"
);


const onSubmit = () => {
  
 setIsAdd(false)
  if (passwordError === true) return alert("Contraseña Invalida");
 
  

  console.log(userName, password, passwordConfirm, email, userType);

  if (password !== passwordConfirm) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "La contraseña no coincide!",
      footer: "Prueba nuevamente",
      showConfirmButton: false,
      timer: 2500,
    });

    if (!password || !passwordConfirm || !userName || !email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes completar todos los campos",
        footer: "Prueba nuevamente",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }

  console.log(userName, password, passwordConfirm, email, userType)
  auth.register(
    
    { userName, password, passwordConfirm, email, userType },
    (respon) => {
      console.log(respon.message)
      if (respon.message === "Usuario Creado") {
        setIsAdd(true)
        Swal.fire({
          icon: "success",
          
          text: "Usuario Registrado con exito!",
         
          showConfirmButton: false,
          timer: 2500,
          
        });
        
        refreshView()
      
      } else {
         Swal.fire({
          icon: "warning",
          
          text: "Correo electronico o nombre de usuario en uso",
         
          showConfirmButton: false,
          timer: 2500,
          
        });
      }
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
    }
  );
}

  const onDelete = (e) => {
    Swal.fire({
      title: '¿Esta seguro?',
      text: "No podra revertir la accion a realizar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDelete(false)
        let email = e;
        
        const options = {
          headers: { 'Content-Type': 'application/json' },
          method: 'DELETE',
        };
        
        fetch(`http://127.0.0.1:8080/api/v1/deletePerson/${email}`,options) //full list of services 
          .then((response) => response.json())
          .then((data) => {
            console.log("delete :",data)
            refreshView()
           
          })
          .catch((err) => {
            
            console.log(err)
          });


        Swal.fire(
          
           {
            icon: 'success',
            title: 'El usuario fue eliminado con exito',
            showConfirmButton: false,
            timer: 1500
          })
        
      }
    })
    
    
    
    
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/v1/person`) //full list of services 
      .then((response) => response.json())
      .then((data) => {
        console.log("usuarios",data)
        setIsLoaded(true);
        setUsers(data.response);
       
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  }, [
    // [isDelete],[isAdd]
  ]);

  if (users.error) {
    return (
      <div className='error-msg'>
        <Icon path={mdiAlertCircle} title='alert' size={1} id='alert-circle' />
        <h4>{users.msg}</h4>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <Spinner animation='grow' role='status' variant='Dark'>
        <span className='visually-hidden'>Cargando...</span>
      </Spinner>
    );
  } else {
    return (
      <>
      <div className="col-md-9">
       
       <div className="card p-2 mt-3">
        
      <input 
           className="form-control mb-2"  placeholder="Nombre de Usuario" 
           value={userName}
           onChange={(e) => setUserName(e.target.value)} 
          />
          <input 
           className="form-control mb-2"  placeholder="Email" 
           value={email}
           onChange={(e) => setEmail(e.target.value)} 
          />

          <input 
           className="form-control mb-2"  placeholder="Contraseña" 
           type='password'
           value={password}
           onChange={(e) => setPassword(e.target.value)} 
          />
           <input 
           className="form-control mb-2"  placeholder="Confirme Contraseña" 
           type='password'
           value={passwordConfirm}
           onChange={(e) => setPasswordConfirm(e.target.value)} 
          />
          <div className="switch-usuario-rg" id="switch-us-rg">
              <SwitchSelector
              
                onChange={onChangeNew}
                options={optionsAdmin}
                initialSelectedIndex={initialSelectedIndexNew}
                backgroundColor={"#6E6E6E"}
                fontColor={"#f5f6fa"}
              />
            </div>

          <button 
            className="btn btn-success" 
           onClick={onSubmit}
            >
              Agregar
            </button>  
     </div>   
  </div>
      <div className='users-container'>
      <Table hover responsive dark  size="sm">
      <thead>
          <tr>
            
            <th>Nombre de usuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Tipo de usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {users.map((item, index) => (
         
          <tr key={index} item={item}>
             
            <td>{item.username}</td>
            <td>{item.name}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
            <td>{item.tipo_usuario_name}</td>
            <td>
                <Button
                onClick={(e) => onDelete(item.email)}
                
                  type="submit"
                  variant="outline-dark"
                >
                  Eliminar
                </Button></td>
          </tr>
          ))}
          </tbody>
      
    </Table>
        
        
      </div>
      </>
    );
  }
}
