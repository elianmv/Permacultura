
import './Usuarios.css';
import { useState, useEffect } from 'react';
import {Table, Button} from 'reactstrap';

import { useAuthContext } from '../../context/AuthContext/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import Icon from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';
import Swal from 'sweetalert2'


export function Usuarios() {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const { userName } = useAuthContext();

const [isDelete,setIsDelete]= useState ();
const [userToDelete,setuserToDelete]= useState ('');


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
            setIsDelete(true)
           
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
  }, [isDelete]);

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
