import './CardService.css';
import Swal from "sweetalert2";
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardSubtitle,

} from 'reactstrap';
import { Accordion } from 'react-bootstrap';

export function CardService({ item }) {

  const onClick = ()=>{
    Swal.fire({
      title: 'Su Pedido Ya fue realizado con exito! ',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    })
  }
  return (
    <div className='card-service'>
      <div className='proveedor'>
      <h4>Proveedor</h4>
      <div className='div-icon'>
      <ion-icon className='icon' name="person-outline"></ion-icon>
      <h5>{item.nombre} {item.apellido}</h5>
      </div>
      </div>
      
    <Card className='card'>

      <CardBody className='card-content'>
        <CardTitle tag='h4'>{item.categoria}</CardTitle>
        <CardTitle tag='h4'>{item.servicio}</CardTitle>
        <CardTitle tag='h5'>$ {item.precio}</CardTitle>
        <CardSubtitle className='mb-2 text-muted' tag='h6'>
        </CardSubtitle>
        <CardText>
          <Accordion flush>
            <Accordion.Item eventKey='1' flush>
              <Accordion.Header>Descripción</Accordion.Header>
              <Accordion.Body>Publicado por {item.nombre} {item.apellido}</Accordion.Body>
              <Accordion.Body>{item.description}</Accordion.Body>
              <Accordion.Body><Button
              
    color="success"
    outline
    onClick = {onClick}
  >
    Contratar Servicio
  </Button></Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </CardText>
      </CardBody>
    </Card>
    </div>
  );
}
