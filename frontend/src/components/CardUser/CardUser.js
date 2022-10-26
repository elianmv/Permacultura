import "./CardUser.css";
import Swal from "sweetalert2";
import {
  Table,
  Button,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardSubtitle,
} from "reactstrap";
import { Accordion } from "react-bootstrap";

export function CardUser({ item }) {

  const onDelete = () => {
    console.log("delete")
  };


  return (
    <Table className="card">
      <thead>
          <tr>
            
            <th>Nombre de usuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td>{item.username}</td>
            <td>{item.name}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
            <td><Button
              
    color="success"
    outline
    onClick = {(e)=> {console.log("entra")}}
  >
    Contratar Servicio
  </Button></td>
          </tr>
          </tbody>
      
    </Table>
  );
}
