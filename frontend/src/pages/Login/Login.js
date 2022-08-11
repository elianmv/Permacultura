import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";
import "./Login.css";
import Input from "./Components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

const json = [
  { user: "juang@gmail.com", passw: "123456" },
  { user: "eliv@gmail.com", passw: "123456" },
];

export function Login() {
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuthContext();

  const handleChange = (name, value) => {
    if (name === "password") {
      if (value.length < 6) {
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
    const username = formData.get("username");
    const password = formData.get("password");
    json.map((element) => {
      if (element.user === username && element.passw === password) {
        check = true;
        auth.login({ username, password }, () => {
          // Send them back to the page they tried to visit when they were
          // redirected to the login page. Use { replace: true } so we don't create
          // another entry in the history stack for the login page.  This means that
          // when they get to the protected page and click the back button, they
          // won't end up back on the login page, which is also really nice for the
          // user experience.
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        });
      }
    });
    if(!check) return alert("Contraseña Invalida");
  };

  return (
    <div id="div-login">
      <form id="form-login" onSubmit={onSubmit}>
        <h1>SyCAS</h1>
        <h4>Servicios y Capacitaciones de Ambientes Sustentables</h4>
        <h3 id="titulo-login">¡Bienvenido!</h3>
        <span id={passwordError ? "icon-err" : "icon"}>
          <FontAwesomeIcon icon={faEnvelope} />
        </span>

        <div className="input-usuario">
          <Input
            handleChange={handleChange}
            name="username"
            placeholder="Username"
            type="email"
          />
        </div>
        <span id={passwordError ? "icon-pssw-err" : "icon-pssw"}>
          <FontAwesomeIcon icon={faKey} />
        </span>

        <div className="input-usuario">
          <Input
            handleChange={handleChange}
            param={passwordError}
            name="password"
            placeholder="Password"
            type="password"
          />
        </div>
        {passwordError && <label id="label-error">Contraseña Incorrecta</label>}
        <button className="button-login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
