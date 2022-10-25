
import './Usuarios.css';
import { useState, useEffect } from 'react';
import {Table, Button} from 'reactstrap';
import { CardUser } from '../CardUser/CardUser';
import { useAuthContext } from '../../context/AuthContext/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import Icon from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';



export function Usuarios() {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const { userName } = useAuthContext();

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/v1/usuarios`) //full list of services 
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
  }, []);

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
      <Table Dark>
      <thead>
          <tr>
            
            <th>Username</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
        {users.map((item, index) => (
          <tr>
            
            <td>{item.username}</td>
            <td>{item.name}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
            <td><Button color="danger">
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
