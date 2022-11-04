import React from "react";
import { useState, useEffect } from "react";
import { Menu } from "../../components";

import { useAuthContext } from "../../context";
import "./Config.css";


import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Usuarios } from '../../components/Usuarios';
import { ProvServicios } from '../../components/ProvServicios';


export function Config() {
  const { user } = useAuthContext()
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  
  const [name, setName] = useState(user.response[0].name);
  const [emailUser, setEmailUser] = useState(user.response[0].email);
  const [lastName, setLastName] = useState(user.response[0].lastname);
  const [phone, setPhone] = useState(user.response[0].phone);

  const [dni, setDni] = useState(user.response[0].dni);

  const [country, setCountry] = useState('Argentina');
  const [city, setCity] = useState(user.response[0].city);
  const [street, setStreet] = useState(user.response[0].street);
  const [number, setNumber] = useState(user.response[0].number);
  const auth = useAuthContext();
  const [cities, setCities] = useState();
  const handleChange = (name, value) => {
    if (name === "password") {
      if (value.length < 3) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };


  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/cities/${country}`) //full list of cities
      .then((response) => response.json())
      .then((data) => {
       
        setIsLoaded(true);
        setCities(data.response);
        
       
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  }, [country]);

  const options = [
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

  ];





  const onSubmit = () => {
 

    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
  
      body: JSON.stringify({ country, city, dni, name, lastName, phone, street ,number, emailUser }),
    };
  
    fetch(`http://localhost:8080/api/v1/updateRegister/${emailUser}`,options) //full list of services
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setIsLoaded(true);
          
          
            if (data.message === 'Datos actualizados'){
            Swal.fire(
            {

             icon: 'success',
             title: 'Sus datos fueron actualizados con exito',
             showConfirmButton: false,
             timer: 1500
           })
          }
          else {
            Swal.fire(
              {
  
               icon: 'warning',
               title: 'Debe completar todos los campos de ciudad',
               showConfirmButton: false,
               timer: 1500
             })
          }
         
        })
        .catch((err) => {
          setIsLoaded(true);
          setError(err);
        });
  
    }

    



  

  return (
    <>
      <Menu />
      <div className="body-config">

        <div className="register">
          <div className="content-register">
            <h2 className="title-register">Actualice sus Datos</h2>{" "}
            {/* form */}
            <Form  className="table-config">

              <div className="input-group">
                <span className="input-group-text">Nombre</span>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="name"
                  name="Name"
                  className="form-control"
                  placeholder="Opcional"
                />
              </div>
              <div className="input-group">
                <span className="input-group-text">Apellido</span>

                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  aria-label="lastName"
                  name="lastName"
                  className="form-control"
                  placeholder="Opcional"
                />
              </div>
              <div className="input-group">
                <span className="input-group-text">Dni</span>

                <input
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  aria-label="dni"
                  name="dni"
                  className="form-control"
                  placeholder="Opcional"
                />
              </div>
              <div className="input-group">
                <span className="input-group-text">Telefono</span>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-label="phone"
                  name="phone"
                  className="form-control"
                  placeholder="Opcional"
                />
              </div>

              <div className="input-group">
                <span className="input-group-text">Pais</span>

                <Form.Select aria-label="Default select example" value= {country} onChange = {(e) => setCountry(e.target.value)}  >
                  <option >Seleccione su Pais</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Chile">Chile</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Uruguay">Uruguay</option>


               </Form.Select>
               { cities? <>
                 <span className="input-group-text">Ciudad</span>

                <Form.Select aria-label="Default select example" value={city}  onChange = {(e) => setCity(e.target.value)}  >
                <option >Seleccione su ciudad</option>
                  {cities.map((item, index) => (
         
         
             <option value={item.zip_code}>{item.name}</option>
          
           ))} </Form.Select>
           </> : null } 

                
              </div>
              <div className="input-group">
                <span className="input-group-text">Calle</span>

                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  aria-label="street"
                  name="street"
                  className="form-control"
                  placeholder="Opcional"
                />
                <span className="input-group-text">N°</span>

                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  aria-label="number"
                  name="number"
                  className="form-control"
                  placeholder="Opcional"
                />
              </div>
              
              <div>
                <Button
                
                  variant="outline-success"
                  onClick={onSubmit}
                >
                  Registrar
                </Button>{" "}
                <Button
                  type="reset"
                  variant="outline-dark"
                >
                  Cancelar
                </Button>
              </div>
              

            </Form>
          </div>
        </div>
        <div className="users-container">
      {user.response[0].tipo_usuario_name === 'admin'? <Usuarios /> : null}
      {user.response[0].tipo_usuario_name === 'prov'? <ProvServicios /> : null}
      
      
      </div>
      </div>
      
     
    </>
  );
}
