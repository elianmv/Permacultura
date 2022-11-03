import { Menu } from '../../components';
import { Servicios } from '../../components/Servicios';


import './Private.css';

export function Private() {
  return (
    <div className='private-container'>
      <Menu />
      <div className='private-content'>
        <h3>Servicios disponibles</h3>
        <Servicios />
      </div>
      
    </div>
  );
}
