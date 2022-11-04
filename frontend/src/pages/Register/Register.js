import React from "react";
import { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";
import "./Register.css";

import SwitchSelector from "react-switch-selector";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export function Register() {

  const [userType, setuserType] = useState("cli");

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuthContext();

  const options = [
    {
      label: <span>Cliente</span>,
      value: "cli",
      
      selectedBackgroundColor: "#66CC00",
    },
    {
      label: "Proveedor",
      value: "prov",
      selectedBackgroundColor: "#66CC00",
    },
  ];

  const onChange = (newValue) => {
    setuserType(newValue);
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "cli"
  );

  const onCancel =() =>{
    const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    
    const formData = new FormData(event.currentTarget);
    const userName = formData.get("userName");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");
    const email = formData.get("email");
    

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

   
    auth.register(
      { userName, password, passwordConfirm, email, userType },
      (respon) => {
        if (respon.message === "Usuario Creado") {
          Swal.fire({
            icon: "success",
            title: "Felicidades!",
            text: "Usuario Registrado con exito!",
            footer: "Sera redirigido al Login en breve",
            showConfirmButton: false,
            timer: 2500,
          });
          setTimeout(() => {
            const from = location.state?.from?.pathname || "/login";
          navigate(from, { replace: true });
          }, 3000);
          
        
        } else {
          return alert(respon.message);
        }
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
      }
    );
 
 
  };

  return (
    <div className="body-container">
      
      <div className="register">
        <div className="content-register">
          <h2 className="title-register">Registro</h2>{" "}
          <Form onSubmit={onSubmit} className="table-register">
            <div className="input-group">
              <span className="input-group-text">Nombre de Usuario</span>

              <input
                type="text"
                aria-label="username"
                name="userName"
                className="form-control"
                placeholder="Obligatorio"
              />
            </div>
            <div className="input-group">
              <span className="input-group-text">Email</span>

              <input
                type="email"
                aria-label="username"
                name="email"
                className="form-control"
                placeholder="Obligatorio"
              />
            </div>
            <div className="input-group">
              <span className="input-group-text">Contraseña</span>

              <input
                type="password"
                aria-label="password"
                name="password"
                className="form-control"
                placeholder="Obligatorio"
              />
            </div>
            <div className="input-group">
              <span className="input-group-text"> Repita la Contraseña</span>

              <input
                type="password"
                aria-label="passwordConfirm"
                name="passwordConfirm"
                className="form-control"
                placeholder="Obligatorio"
              />
            </div>
            <div className="switch-usuario-rg" id="switch-us-rg">
              <SwitchSelector
              
                onChange={onChange}
                options={options}
                initialSelectedIndex={initialSelectedIndex}
                backgroundColor={"#6E6E6E"}
                fontColor={"#f5f6fa"}
              />
            </div>
            <div>
              <Button
                type="submit"
                variant="outline-success"
                
              >
                Registrar
              </Button>{" "}
              <Button
                onClick={onCancel}
                variant="outline-dark"
                
              >
                Cancelar
              </Button>
            </div>

           
          </Form>
        </div>
      </div>
    </div>
  );
}
