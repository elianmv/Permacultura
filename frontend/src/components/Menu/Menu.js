import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Menu.css';
import { useAuthContext } from '../../context';
import { createContext, useContext, useState } from 'react';
import Icon from '@mdi/react';
import { mdiAccountEdit, mdiLogout } from '@mdi/js';

import { NavDropdown } from 'react-bootstrap';


export function Menu() {
  const {user, setUser, setUserLoggedIn} = useAuthContext()
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuthContext();
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
          <Link to='/private'>Private</Link>
        </li>
       {!user? <li className='menu-item'>
          <Link to='/login'>login</Link>
        </li>
        : null
      }
      {!user? <li className='menu-item'>
          <Link to='/register'>Register</Link>
        </li>
        : null
      }
       
          {user? <li id='username'><NavDropdown
            id='nav-dropdown-dark-example'
            title={`WELCOME, ${user[0].name}!`}
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
                {' Settings'}
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
                {'Logout'}
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </li> : null }
      </ul> 
    </div>
  );
}

