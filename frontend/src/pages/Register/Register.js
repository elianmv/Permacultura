import React from "react";
import { useState } from "react";
import { Menu } from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";
import "./Register.css";
import InputRegister from "./Components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import SwitchSelector from "react-switch-selector";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export function Register() {
  const [passwordError, setPasswordError] = useState(false);
  const [userType, setuserType] = useState("cli");

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuthContext();

  const handleChange = (name, value) => {
    if (name === "password") {
      if (value.length < 3) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };

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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let check = false;
    if (passwordError === true) return alert("Contraseña Invalida");
    const formData = new FormData(event.currentTarget);
    const userName = formData.get("userName");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");
    const email = formData.get("email");
    

    console.log(userName, password, passwordConfirm, email, userType);
    // const name = formData.get("name");
    // const lastName = formData.get("lastname");
    // const dni = formData.get("dni");

    // const phone = formData.get("phone");
    // const country = formData.get("country");
    // const city = formData.get("city");
    // const street = formData.get("street");
    // const number = formData.get("number");

    // json.map((element) => {
    //   if (element.user === userName && element.passw === password) {

    if (password !== passwordConfirm) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Passwords do not match!",
        footer: "Try again",
        showConfirmButton: false,
        timer: 2500,
      });

      if (!password || !passwordConfirm || !userName) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "you have to complete the required fields",
          footer: "Try again",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    }
    //     check = true;
    auth.register(
      { userName, password, passwordConfirm, email, userType },
      (respon) => {
        if (respon.status) {
          const from = location.state?.from?.pathname || "/login";
          navigate(from, { replace: true });
          return alert("Su usuario fue registrado con exito");
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
    //   }
    //   });
    //   if(!check) return alert("Contraseña Invalida");
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
                type="text"
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
                //   onClick={this.props.handleInsert}
              >
                Registrar
              </Button>{" "}
              <Button
                type="reset"
                variant="outline-dark"
                //   onClick={this.props.handleInsert}
              >
                Cancelar
              </Button>
            </div>

            {/* <div className="input-usuario-rg" id="input-us-rg">
            <InputRegister
              handleChange={handleChange}
              name="dni"
              placeholder="Dni"
              type="text"
              id="input-us-rg"
            />
          </div>
          <div className="input-usuario-rg" id="input-us-rg">
            <InputRegister
              handleChange={handleChange}
              name="name"
              placeholder="Nombre"
              type="text"
              id="input-us-rg"
            />
          </div>
          <div className="input-usuario-rg" id="input-us-rg">
            <InputRegister
              handleChange={handleChange}
              name="lastName"
              placeholder="Apellido"
              type="text"
              id="input-us-rg"
            />
          </div>

          <div className="input-usuario-rg" id="input-us-rg">
            <InputRegister
              handleChange={handleChange}
              name="country"
              placeholder="Pais"
              type="text"
              id="input-us-rg"
            />
          </div>
          <div className="input-usuario-rg" id="input-us-rg">
            <InputRegister
              handleChange={handleChange}
              name="city"
              placeholder="Ciudad"
              type="text"
              id="input-us-rg"
            />
          </div>
          <div className="input-address">
            <div className="input-usuario-rg" id="input-us-rg">
              <InputRegister
                handleChange={handleChange}
                name="street"
                placeholder="Calle"
                type="text"
                id="input-us-rg"
              />
            </div>
            <div className="input-usuario-rg" id="input-us-rg">
              <InputRegister
                handleChange={handleChange}
                name="number"
                placeholder="Numero"
                type="text"
                id="input-us-rg"
              />
            </div>
          </div>
          <div className="input-usuario-rg" id="input-us-rg">
            <InputRegister
              handleChange={handleChange}
              name="phone"
              placeholder="Telefono"
              type="select"
              id="input-us-rg"
            />
          </div> */}
          </Form>
        </div>
      </div>
    </div>
  );
}
