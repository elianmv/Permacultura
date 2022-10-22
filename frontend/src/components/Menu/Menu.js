import { Link } from 'react-router-dom';
import './Menu.css';
import { useAuthContext } from '../../context';
import { createContext, useContext, useState } from 'react';



export function Menu() {
  const {userLoggedIn,user} = useAuthContext()

  console.log(userLoggedIn)
  return (
    <div className="Menu">
     
      <ul>
      {user?<li>{user[0].username}</li>:null
}
        <li>
          <Link to="/">Home</Link>
        </li>
        
        <li>
          <Link to="/private">Private</Link>
        </li>
        <li>
          { userLoggedIn? <li> <Link to="/config">Config</Link> </li>: 
          <li><Link to="/register">Register</Link></li>}
        </li>
        
        { userLoggedIn?<li><Link to="/login">logout</Link></li>:<li><Link to="/login">login</Link>
        </li>}
      </ul>
    </div>
  );
}
