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
    const userName = formData.get("userName");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");
    const email = formData.get("email");
    const userType = formData.get("usertype");

    console.log(userName, password,passwordConfirm,email, userType)
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
    //     check = true;
    auth.register({ userName, password, passwordConfirm, email, userType }, (respon) => {

      if (respon.status) {
        const from = location.state?.from?.pathname || "/login";
        navigate(from, { replace: true });
        return alert('Su usuario fue registrado con exito')
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
  //   }
  //   });
  //   if(!check) return alert("Contraseña Invalida");
  };

  return (
    
      <div id="div-rg" >

        <form id="form-rg" onSubmit={onSubmit}  >

          <h1>SyCAS</h1>
          <h1>Registro</h1>


          <h3 id="titulo-rg">Complete Con sus Datos</h3>
          <span className="icon-rg" id={passwordError ? "icon-err-rg" : "icon-rg"}>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>


          <div className="input-usuario-rg" id="input-us-rg">
            <InputRegister
              handleChange={handleChange}
              name="userName"
              placeholder="Nombre de Usuario"
              type="text"
              id="input-us-rg"
            />
          </div>
          <div className="input-usuario-rg" id="input-us-rg">
            <InputRegister
              handleChange={handleChange}
              name="email"
              placeholder="Correo Electronico"
              type="email"
              id="input-us-rg"
            />
          </div>
          <div className="input-usuario-rg" id="input-pw-rg">
            <InputRegister
              handleChange={handleChange}
              param={passwordError}
              name="password"
              placeholder="Contraseña"
              type="password"
              id="input-pw-rg"
            />
          </div>
          <div className="input-usuario-rg" id="input-pw-rg">
            <InputRegister
              handleChange={handleChange}
              param={passwordError}
              name="passwordConfirm"
              placeholder="Repita su Contraseña"
              type="password"
              id="input-pw-rg"
            />
          </div>
          {passwordError && <label id="label-error-rg">La Contraseña debe contener mas de 3 caracteres</label>}  
          
          
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
          <div className="input-usuario-rg" id="input-us-rg">
            <select
              handleChange={handleChange}
              name="usertype"
              placeholder="Tipo de Usuario"
              id="input-us-rg"
            >
              <option value={"prov"} > Proveedor</option>
              <option value={"cli"} >Cliente</option>
            </select>
          </div>

          <span className="icon-pssw-rg" id={passwordError ? "icon-pssw-err-rg" : "icon-pssw-rg"}>
            <FontAwesomeIcon icon={faKey} />
          </span>


          <button className="button-rg" type="submit">
            Registrese
          </button>
        </form>

      </div>

    


  );
}


