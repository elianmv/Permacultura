import React from "react";
import { useState } from "react";
import { Menu } from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";
import "./About.css";

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
            se remonta al año 2019 cuando un grupo de novatos en el desarrollo
            se aventuran poner en practica cada experiencia que fueron recibiendo, para
            desarrollar la actividad que mas disfrutaban en sus vidas: EL
            DESARROLLO DE SOFTWARE . En su comienzo el objetivo era muy
            humilde: tener una pequeña librería de COMPRA-VENTA-CANJE de libros
            y revistas usadas con la cual lograr dos de las mas importantes
            necesidades básicas planteadas en ese momento que eran subsistir y
            hacer algo placentero que justificara la existencia en la tierra. Y
            como toda buena librería de compra-venta y canje de libros usados de
            Buenos Aires, echaron raíces en una vieja galería del centro
            comercial de la ciudad de MORON.
          </p>
        </div>
        <div className="personas">
          <h1>¿Quienes somos?</h1>
        </div>
        <div className="picture">
          <div className="personas">
            <div className="text-p">
              <h2>Cipriano de Los Santos</h2>
              <p>
                {" "}
                Es un economista e historiador económico venezolano. Ha estado
                interesado desde la década de 1980 en la retórica de la
                persuasión, particularmente de la economía y, más adelante, en
                asuntos literarios más amplios tales como la teoría literaria y
                la teoría social.
              </p>
            </div>
            <img src="assets/personas/persona1.jpg" alt=""></img>
          </div>
          <div className="personas">
            <img src="assets/personas/persona2.jpg" alt=""></img>
            <div className="text-p">
              <h2>Estela Sanchez</h2>
              <p>
                Estela Sanchez es una escritora, crítica literaria y profesora
                universitaria española. Desde 2017 es presidenta de la
                asociación sobre género y cultura Clásicas y Modernas
              </p>
            </div>
          </div>
          <div className="personas">
            <div className="text-p">
              <h2>Maria Inmaculada Lora</h2>
              <p>
                {" "}
                Marquésa de Dalí de Púbol fue una pintora, escultora, grabadora,
                escenógrafa y escritora española del siglo XXI. Se le considera
                uno de los máximos representantes del surrealismo. Salvador Dalí
                es conocido por sus impactantes y oníricas imágenes
                surrealistas.
              </p>
            </div>
            <img src="assets/personas/persona3.jpg" alt=""></img>
          </div>
          <div className="personas">
            <img src="assets/personas/persona4.jpg" alt=""></img>
            <div className="text-p">
              <h2>Marco Antonio Pujol</h2>
              <p>
                Marco Antonio es un filólogo hispanista y arabista, historiador
                y poeta, especializado en la Edad Media y el Siglo de Oro y, más
                concretamente, en estudios cidianos, tanto históricos como
                literarios.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-us">
        <div>
          <div className="info">
            <h1>Informacion de contacto:</h1>
            <ul>
              <li> Telefono: 249-468152</li>
              <li>E-mail: book-dimension@gl.com</li>
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
