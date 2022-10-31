
import './ProvServicios.css';
import { useState, useEffect } from 'react';
import {Table, Button} from 'reactstrap';
import { Form } from "react-bootstrap";
import { useAuthContext } from '../../context/AuthContext/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import Icon from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';
import Swal from 'sweetalert2'


export function ProvServicios() {
  const [servicios, setServicios] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState();
  const [tiempo, setTiempo] = useState();
  const [precio, setPrecio] = useState();
  const [descripcion, setDescripcion] = useState('');
  const [servicio, setServicio] = useState();
  const [ bandera, setBandera ] = useState(true)
  const [ services, setServices ] = useState()
  const [ editService, setEditService ] = useState()

  const { user } = useAuthContext();

const [isDelete,setIsDelete]= useState ();
const [userToDelete,setuserToDelete]= useState ('');


const addplato = async () => {
  // let obj = { nombre, precio, ingredientes } 
  // const res = await axios.post(URL, obj) 
  // console.log(res.data)
  // setNombre('')
  // setprecio('')
  // setIngredientes('')
  // getPlatos()
}  


const getplato =(id) => {
  // const res = await axios.get(URL+'/'+id)
  // setId(res.data._id)

  // setIngredientes(res.data.ingredientes)
  // setBandera(false)
  // window.scrollTo(0,0)
 
    fetch(`http://localhost:8080/api/v1/services/${id}`) //full list of services
      .then((response) => response.json())
      .then((data) => {
        
        setIsLoaded(true);
        setBandera(false)
        setEditService(data.response[0]);
        setTiempo(editService.tiempo_estimado)
        setDescripcion(editService.description)
        setPrecio(editService.precio)
        
        console.log("servicioToEdit",editService)
       
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
 
}

const addOrUpdateplato = () => {
  bandera? addplato() : update()   
}

const update = async () => {
  // const obj = {  id, nombre, precio, ingredientes }
  // // console.log( 'id:' + id, 'n:' + nombre, 'precio:' + precio, 'ingredientes:' + ingredientes)
  // const res = await axios.put(URL + '/' + id, obj)
  // console.log(res.data)
  // setBandera(true)
  // setNombre('')
  // setprecio('')
  // setIngredientes('')
  // getPlatos()
}

  const onDelete = (e) => {
    console.log(e)
    Swal.fire({
      title: '¿Esta seguro?',
      text: "No podra revertir la accion a realizar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDelete(false)
        let id = e;
        
        const options = {
          headers: { 'Content-Type': 'application/json' },
          method: 'DELETE',
        };
        
        fetch(`http://127.0.0.1:8080/api/v1/services/${id}`,options) //full list of services 
          .then((response) => response.json())
          .then((data) => {
            console.log("servicios de prov a eliminar :",data)
            setIsDelete(true)
           
          })
          .catch((err) => {
            
            console.log(err)
          });


        Swal.fire(
          
           {
            icon: 'success',
            title: 'El usuario fue eliminado con exito',
            showConfirmButton: false,
            timer: 1500
          })
        
      }
    })
  }


  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/services`) //full list of services
      .then((response) => response.json())
      .then((data) => {
        console.log("servicios",data)
        setIsLoaded(true);
        setServices(data.response);
        console.log('servicios:',services)
       
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  }, []);
    
    
  // };

  useEffect(() => {
    console.log('email ',user.response[0].email)
    fetch(`http://127.0.0.1:8080/api/v1/publicaciones/${user.response[0].email}`) //full list of services 
      .then((response) => response.json())
      .then((data) => {
        console.log("serv de prov",data)
        setIsLoaded(true);
        setServicios(data.response);
       
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  }, [isDelete]);

  if (servicios.error) {
    return (
      <div className='error-msg'>
        <Icon path={mdiAlertCircle} title='alert' size={1} id='alert-circle' />
        <h4>{servicios.msg}</h4>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <Spinner animation='grow' role='status' variant='Dark'>
        <span className='visually-hidden'>Cargando...</span>
      </Spinner>
    );
  } else {
    return (
      <>
      
      <div >
      <div className="col-md-9">
       
       <div className="card p-2 mt-3">
        
       

{services?<><Form.Select aria-label="Default select example" value={servicio}  onChange = {(e) => setServicio(e.target.value)}  >
<option >Servicio</option>
  {services.map((item, index) => (


<option value={item.id}>{item.name}</option>

))} </Form.Select> </> :null}

         <input 
           className="form-control mb-2"  placeholder="Precio" 
           value={precio}
           onChange={(e) => setPrecio(e.target.value)} 
          />

          <input 
           className="form-control mb-2"  placeholder="Descripcion" 
           value={descripcion}
           onChange={(e) => setDescripcion(e.target.value)} 
          />
           <input 
           className="form-control mb-2"  placeholder="Tiempo estimado" 
           value={tiempo}
           onChange={(e) => setTiempo(e.target.value)} 
          />

          <button 
            className="btn btn-warning" 
            onClick={addOrUpdateplato}>{bandera?'Agregar':'Aplicar'}</button>  
     </div>   
  </div>
      <Table hover responsive dark  size="sm">
      <thead>
          <tr>
            
            <th>Servicio</th>
            <th>precio</th>
            <th>descripcion</th>
            
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {servicios.map((item, index) => (
         
          <tr key={index} item={item}>
             
            <td>{item.name}</td>
            <td>{item.precio}</td>
            <td>{item.description}</td>
            
            <td>
                <Button
                onClick={() => onDelete(item.id)}
                
                  type="submit"
                  color="danger"
                >
                  Eliminar
                </Button>
                <Button 
                 type='submit'
                 color="warning"
                 onClick={() => getplato(item.id)}>Modificar</Button> 
                 </td>
          </tr>
          ))}
          </tbody>
      
    </Table>
        
        
      </div>
      </>
    );
  }
}
