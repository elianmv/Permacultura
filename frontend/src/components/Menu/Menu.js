import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Menu.css';
import { useAuthContext } from '../../context';

import Icon from '@mdi/react';
import { mdiAccountEdit, mdiLogout } from '@mdi/js';

import { NavDropdown } from 'react-bootstrap';


export function Menu() {
  const {user, setUser, setUserLoggedIn} = useAuthContext()
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuthContext();

  console.log(user)


  const handleClickLogout = () => {
    setUser(null);
    setUserLoggedIn(false);
    
    auth.logout(() => {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    });
  };
 
  return (
    <div className='Menu'>
      <ul>
        <li className='menu-item'>
          <Link to='/'>Home</Link>
        </li>
        <li className='menu-item'>
          <Link to='/about'>Quienes Somos</Link>
        </li>
        <li className='menu-item'>
          <Link to='/private'>Servicios</Link>
        </li>
       {!user? <li className='menu-item'>
          <Link to='/login'>Ingresar</Link>
        </li>
        : null
      }
      {!user? <li className='menu-item'>
          <Link to='/register'>Registrarse</Link>
        </li>
        : null
      }
       
          {user? <li id='username'><NavDropdown
            id='nav-dropdown-dark-example'
            title={`WELCOME, ${user.response[0].username}!`}
            menuVariant='dark'
            size='sm'
            align='end'
            autoClose='true'
          >
            <NavDropdown.Item className='username-item'>
              <Link to='/config'>
                <Icon
                  path={mdiAccountEdit}
                  title='User Profile'
                  size={0.8}
                  color='#def1f0'
                />
                {' Configuraciones'}
              </Link>
            </NavDropdown.Item>

            <NavDropdown.Item className='username-item'>
            <Link to='/' onClick={handleClickLogout}>
                <Icon
                  path={mdiLogout}
                  title='User Profile'
                  size={0.8}
                  color='#def1f0'
                />
                {'Desconectarse'}
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </li> : null }
      </ul> 
    </div>
  );
}

