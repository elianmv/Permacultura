import React from "react";
import { useState } from "react";
import { Menu } from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";
import "./About.css";
import juan from '../../assets/images/juan.jpeg';
import franco from '../../assets/images/franco.jpeg';
import elian from '../../assets/images/elian.jpeg';

export function About() {
  
    return (
    <>
    <Menu />
      <div className="personas">
        <h1>Nuestros comienzos</h1>
      </div>

      <div className="proposite">
        <div>
          <p>
            El nacimiento de lo que hoy se conoce como SyCas Permacultura 
            se remonta al año 2019 cuando un grupo estudiantes
            se aventuran poner en practica cada experiencia que fueron recibiendo, para
            desarrollar la actividad que mas disfrutaban en sus vidas: EL
            DESARROLLO DE SOFTWARE. Cada uno se siguio su camino y en este momento pudimos demostrar
            todo lo aprendido tanto institucional como laboralmente!
          </p>
        </div>
        <div className="personas">
          <h1>¿Quienes somos?</h1>
        </div>
        <div className="picture">
          <div className="personas">
            <div className="text-p">
              <h2>Juan Arias</h2>
              <p>
                {" "}
                Desarrollador SAP UI5/Fiori, encaminado hacia el backend y apasionado por ayudar a encontrar y solucionar
                conflictos en las aplicaciones. Rapido aprendizaje y
                detallista a la hora de programar.
              </p>
            </div>
            <img
                  className="image-box right"
                  src={juan}
                  alt="ticas-permacultura" />
          </div>
          <div className="personas">
          <img
                  className="image-box right"
                  src={franco}
                  alt="ticas-permacultura" />
            <div className="text-p">
              <h2>Franco Mengochea</h2>
              <p>
                Jugador de futbol de primera! Le gusta trabajar tanto en diseño y front, como manipulando bases de datos.
                Detallista y siempre dando ideas para mejorar la visual
              </p>
            </div>
          </div>
          <div className="personas">
            <div className="text-p">
              <h2>Elian Vergara</h2>
              <p>
                {" "}
                Consultor Cognos Analytics. Siempre investigando el uso de aplicaciones y buscando fallos. Trabajando en bases de datos
                pero siempre tratando de mejorar en el front, que es una tarea entretenida para él.
              </p>
            </div>
            <img
                  className="image-box right"
                  src={elian}
                  alt="ticas-permacultura" />
          </div>
          
        </div>
      </div>

      <div className="about-us">
        <div>
          <div className="info">
            <h1>Informacion de contacto:</h1>
            <ul>
              <li> Telefono: 249-468152</li>
              <li>E-mail: sycas-permacultura@gl.com</li>
            </ul>

            <ul className="info-logos">
              <li className="active">
                {" "}
                <a href="https://www.facebook.com">
                  <i class="fab fa-facebook-square fa-2x"></i>
                </a>{" "}
              </li>
              <li>
                <a href="https://twitter.com">
                  <i class="fab fa-twitter-square fa-2x"></i>
                </a>{" "}
              </li>
              <li>
                <a href="https://www.linkedin.com">
                  <i class="fab fa-linkedin fa-2x"></i>
                </a>{" "}
              </li>
              <li>
                <a href="https://www.instagram.com">
                  <i class="fab fa-instagram fa-2x"></i>
                </a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
