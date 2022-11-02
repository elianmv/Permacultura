import React from "react";
import { useState, useEffect } from "react";
import { Menu } from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";
import "./Config.css";
// import App from "./Components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import SwitchSelector from "react-switch-selector";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Usuarios } from '../../components/Usuarios';
import { ProvServicios } from '../../components/ProvServicios';

export function Config() {
  const { user } = useAuthContext()
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const [userType, setuserType] = useState("cli");
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
    // {
    //   label: "Admin",
    //   value: "admin",
    //   selectedBackgroundColor: "#1E8449",
    // },
  ];

  const onChange = (newValue) => {
    setuserType(newValue);
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "cli"
  );

  const onSubmit = () => {
    // event.preventDefault();
    console.log(country, city, dni, name, lastName, phone, street ,number, emailUser)

    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
  
      body: JSON.stringify({ country, city, dni, name, lastName, phone, street ,number, emailUser }),
    };
  
    fetch(`http://localhost:8080/api/v1/updateRegister/${emailUser}`,options) //full list of services
        .then((response) => response.json())
        .then((data) => {
  
          setIsLoaded(true);
          
          Swal.fire(
            
            {
             icon: 'success',
             title: 'Sus datos fueron actualizados con exito',
             showConfirmButton: false,
             timer: 1500
           })
         
        })
        .catch((err) => {
          setIsLoaded(true);
          setError(err);
        });
  
    }

    

    // auth.update(
    //   { dni, name, lastName, email, phone, userType },
    //   (respon) => {
    //     if (respon.status) {

    //       return alert("Los datos fueron actualizados con exito");
    //     } else {
    //       return alert(respon.message);
    //     }
    //     // Send them back to the page they tried to visit when they were
    //     // redirected to the login page. Use { replace: true } so we don't create
    //     // another entry in the history stack for the login page.  This means that
    //     // when they get to the protected page and click the back button, they
    //     // won't end up back on the login page, which is also really nice for the
    //     // user experience.
    //   }
    // );

  

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
              {user.response[0].tipo_usuario_name === 'cli'? null:
              <div className="switch-usuario-rg" id="switch-us-rg">
                <SwitchSelector

                  onChange={onChange}
                  options={options}
                  initialSelectedIndex={user.response[0].tipo_usuario_name}
                  backgroundColor={"#6E6E6E"}
                  fontColor={"#f5f6fa"}
                />
              </div> }
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
      {user.response[0].tipo_usuario_name === 'cli'? <Usuarios /> : null}
      {user.response[0].tipo_usuario_name === 'cli'? <ProvServicios /> : null}
      
      
      </div>
      </div>
      
     
    </>
  );
}
