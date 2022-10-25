
import './Servicios.css';
import { useState, useEffect } from 'react';
import { CardService } from '../CardService/CardService';
import { useAuthContext } from '../../context/AuthContext/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import Icon from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';



export function Servicios() {
  const [services, setServices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const { userName } = useAuthContext();

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/v1/servicios`) //full list of services 
      .then((response) => response.json())
      .then((data) => {
console.log("data" ,data.response)
        setIsLoaded(true);
        setServices(data.response);
        
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  }, []);

  if (services.error) {
    return (
      <div className='error-msg'>
        <Icon path={mdiAlertCircle} title='alert' size={1} id='alert-circle' />
        <h4>{services.msg}</h4>
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
      
      <div className='services-container'>
        {services.map((item, index) => (
          <CardService key={index} item={item} />
        ))}
      </div>
      </>
    );
  }
}
