import './NotFound.css';

<<<<<<< HEAD
export function NotFound() {
  return <h3>Not Found Page</h3>;
=======
import Icon from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';

export function NotFound() {
  return (
    <div className='not-found-container'>
      <div className='not-found-msg'>
        <Icon path={mdiAlertCircle} title='alert' size={1} id='alert-circle' />
        <h4>Pagina no encontrada!</h4>
      </div>
    </div>
  );
>>>>>>> origin/juan
}
