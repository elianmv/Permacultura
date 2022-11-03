import { Carousel1, Menu } from '../../components';
import { Carousel } from '../../components';
import './Home.css';


export function Home() {
  return (

    <div id="div-home">
      <>
        <Menu />
      </>
      <>
        <Carousel1 />
      </>
      <div className="container">
        <div className="row">
          <div>
            <h1>¿Que es la permacultura?</h1>
            <p>La Permacultura, en su concepción más general, es el diseño y mantenimiento consciente de sistemas productivos agrícolas que imitan la diversidad, la estabilidad y la resiliencia de los ecosistemas naturales. Es la integración armónica del paisaje con las personas que brindan sus alimentos, energía, refugio y otras necesidades materiales y no materiales de manera sostenible.</p>
            <h2>Permacultura: principios éticos y de diseño</h2>
            <p>La permacultura también se inspira en varios principios filosóficos: integrar en lugar de separar, imitar a la madre naturaleza en lugar de competir... La permacultura no es, por tanto, otro enfoque de la jardinería, sino un enfoque ético.</p>
            <p>Así, la permacultura se basa en <strong>tres principios éticos</strong> y <strong>doce de diseño</strong></p>
            <ul className="list--box-check"><li className="title">Los tres principios éticos transversales de la permacultura:</li>
              <li><strong>Cuidar la tierra</strong>;</li>
              <li><strong>Cuidar las personas</strong>;</li>
              <li><strong>Cuidar el futuro</strong>, o sea compartir los recursos con equidad.</li>
            </ul>
            <p>Y los 12 principios de diseño:</p>
            <figure className="image-box no-border">
              <picture>
                <img
                  className="image-box right"
                  src={ticaspermacultura}
                  alt="ticas-permacultura" />
              </picture>
            </figure>
            <ol className="list--numbered"><li><strong>Observar e interactuar</strong>;</li>
              <li><strong>Captar y almacenar energía</strong>;</li>
              <li><strong>Obtener un rendimiento</strong>;</li>
              <li><strong>Aplicar autorregulación y aceptar retroalimentación</strong>;</li>
              <li><strong>Usar y valorar los servicios y recursos naturales</strong>;</li>
              <li><strong>Producir sin desperdicios</strong>;</li>
              <li><strong>Diseñar desde los patrones hacia los detalles</strong>;</li>
              <li><strong>Integrar más que segregar</strong>;</li>
              <li><strong>Usar soluciones lentas y pequeñas</strong>;</li>
              <li><strong>Usar y valorar la diversidad</strong>;</li>
              <li><strong>Usar los bordes y valorar lo marginal</strong>;</li>
              <li><strong>Usar y responder creativamente al cambio</strong>.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
