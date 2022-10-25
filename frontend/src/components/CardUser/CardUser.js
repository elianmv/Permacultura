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
            
            <th>Username</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td>{item.username}</td>
            <td>{item.name}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
            <td><Button  color="danger" onClick={()=>onDelete()}>
          Eliminar
        </Button></td>
          </tr>
          </tbody>
      
    </Table>
  );
}
