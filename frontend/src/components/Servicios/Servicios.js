
import './Servicios.css';
import { useState, useEffect } from 'react';
import { CardService } from '../CardService/CardService';
import { useAuthContext } from '../../context/AuthContext/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import Icon from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';
import { Menu } from "../../components";


export function Servicios() {
  const [services, setServices] = useState({
    response:[],
    message:''
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();


  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/v1/publicaciones`) //full list of services 
      .then((response) => response.json())
      .then((data) => {
        console.log("data" ,data.message)
console.log("data" ,data.response)
        setIsLoaded(true);
        setServices({response:data.response,message:data.message});
        console.log(services)
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  }, [isLoaded]);

  if (services.message === 'Ningún Servicio Encontrado') {
    return (
      <div className='error-msg'>
        <Icon path={mdiAlertCircle} title='alert' size={1} id='alert-circle' />
        <h4>{services.message}</h4>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <Spinner animation='grow' role='status' variant='Dark'>
        <span className='visually-hidden'>Cargando...</span>
      </Spinner>
    );
  }else {
    return (
    <>
      
      <div className='services-container'>
        {services.response.map((item, index) => (
          <CardService key={index}  item={item} />
        ))}
      </div>
      </>);
  }
}
