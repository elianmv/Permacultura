
import './Usuarios.css';
import { useState, useEffect } from 'react';
import {Table, Button} from 'reactstrap';

import { useAuthContext } from '../../context/AuthContext/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import Icon from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';



export function Usuarios() {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const { userName } = useAuthContext();

const [isDelete,setIsDelete]= useState ();
const [userToDelete,setuserToDelet]= useState ();



  const onDelete = (e) => {
    setuserToDelet({...userToDelete,[e.target.name]:e.target.value})
    console.log(userToDelete)
    // const options = {
    //   headers: { 'Content-Type': 'application/json' },
    //   method: 'DELETE',
    // };
    // fetch(`http://127.0.0.1:8080/api/v1/${item.email}`,options) //full list of services 
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("delete :",data)
    //     setIsDelete(true)
       
      // })
      // .catch((err) => {
        
      //   console.log(err)
      // });
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
      <Table dark>
      <thead>
          <tr>
            
            <th>Username</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Tipo de usuario</th>
            <th>Options</th>
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
                onClick={onDelete}
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
