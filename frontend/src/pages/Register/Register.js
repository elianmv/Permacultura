import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";
import "./Register.css";
import InputRegister from "./Components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";


export function Register() {
  const [passwordError, setPasswordError] = useState(false);
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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let check = false;
    if (passwordError === true) return alert("Contraseña Invalida");
    const formData = new FormData(event.currentTarget);
    const userName = formData.get("username");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");
    const name = formData.get("name");
    const lastName = formData.get("lastname");
    const dni = formData.get("dni");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const country = formData.get("country");
    const city = formData.get("city");
    const street = formData.get("street");
    const number = formData.get("number");
    const userType = formData.get("usertype");

    // json.map((element) => {
    //   if (element.user === username && element.passw === password) {
    //     check = true;
    auth.register({ userName, password, passwordConfirm }, (respon) => {

      if (respon.status) {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
        return alert('conexion exitosa')
      } else {
        return alert(respon.message)
      }
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.

    });
    // }
    // });
    // if(!check) return alert("Contraseña Invalida");
  };

  return (
    
      <div id="div-login" >

        <form id="form-login" onSubmit={onSubmit}  >

          <h1>SyCAS</h1>
          <h1>Registro</h1>


          <h3 id="titulo-login">Complete Con sus Datos</h3>
          <span className="icon" id={passwordError ? "icon-err" : "icon"}>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>


          <div className="input-usuario" id="input-us">
            <InputRegister
              handleChange={handleChange}
              name="userName"
              placeholder="Nombre de Usuario"
              type="text"
              id="input-us"
            />
          </div>
          <div className="input-usuario" id="input-us">
            <InputRegister
              handleChange={handleChange}
              name="email"
              placeholder="Correo Electronico"
              type="email"
              id="input-us"
            />
          </div>
          <div className="input-usuario" id="input-pw">
            <InputRegister
              handleChange={handleChange}
              param={passwordError}
              name="password"
              placeholder="Contraseña"
              type="password"
              id="input-pw"
            />
          </div>
          <div className="input-usuario" id="input-pw">
            <InputRegister
              handleChange={handleChange}
              param={passwordError}
              name="passwordConfirm"
              placeholder="Repita su Contraseña"
              type="password"
              id="input-pw"
            />
          </div>
          {passwordError && <label id="label-error">Contraseña Incorrecta</label>}
          {/* <div className="input-usuario" id="input-us">
            <InputRegister
              handleChange={handleChange}
              name="dni"
              placeholder="Dni"
              type="text"
              id="input-us"
            />
          </div>
          <div className="input-usuario" id="input-us">
            <InputRegister
              handleChange={handleChange}
              name="name"
              placeholder="Nombre"
              type="text"
              id="input-us"
            />
          </div>
          <div className="input-usuario" id="input-us">
            <InputRegister
              handleChange={handleChange}
              name="lastName"
              placeholder="Apellido"
              type="text"
              id="input-us"
            />
          </div>

          <div className="input-usuario" id="input-us">
            <InputRegister
              handleChange={handleChange}
              name="country"
              placeholder="Pais"
              type="text"
              id="input-us"
            />
          </div>
          <div className="input-usuario" id="input-us">
            <InputRegister
              handleChange={handleChange}
              name="city"
              placeholder="Ciudad"
              type="text"
              id="input-us"
            />
          </div>
          <div className="input-address">
            <div className="input-usuario" id="input-us">
              <InputRegister
                handleChange={handleChange}
                name="street"
                placeholder="Calle"
                type="text"
                id="input-us"
              />
            </div>
            <div className="input-usuario" id="input-us">
              <InputRegister
                handleChange={handleChange}
                name="number"
                placeholder="Numero"
                type="text"
                id="input-us"
              />
            </div>
          </div>
          <div className="input-usuario" id="input-us">
            <InputRegister
              handleChange={handleChange}
              name="phone"
              placeholder="Telefono"
              type="select"
              id="input-us"
            />
          </div> */}
          <div className="input-usuario" id="input-us">
            <select
              handleChange={handleChange}
              name="usertype"
              placeholder="Tipo de Usuario"
              id="input-us"
            >
              <option value={"prov"} > Proveedor</option>
              <option value={"cli"} >Cliente</option>
            </select>
          </div>

          <span className="icon-pssw" id={passwordError ? "icon-pssw-err" : "icon-pssw"}>
            <FontAwesomeIcon icon={faKey} />
          </span>


          <button className="button-login" type="submit">
            Registrese
          </button>
        </form>

      </div>

    


  );
}


