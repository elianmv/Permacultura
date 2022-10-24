import './CardService.css';

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
  return (
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
              <Accordion.Header>Descripcion</Accordion.Header>
              <Accordion.Body>Publicado por {item.nombre} {item.apellido}</Accordion.Body>
              <Accordion.Body>{item.description}</Accordion.Body>
              <Accordion.Body><Button>Contratar</Button></Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </CardText>
      </CardBody>
    </Card>
  );
}
