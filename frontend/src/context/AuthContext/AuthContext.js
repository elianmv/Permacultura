import { createContext, useContext, useState } from 'react';
import { LoginService } from '../../services';

const AuthContext = createContext();

const initialState = null;
const initialStateUser = false;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(initialState);
  const [userLoggedIn, setUserLoggedIn] = useState(initialStateUser);

  const login = ({ username, password }, onLogin: Function) => {
    LoginService.login(username, password).then((result) => {
      if(!result.message){
        setUser(result);
        setUserLoggedIn(true)
        onLogin({status:true});
      }
      setUserLoggedIn(false)
      onLogin({message:result.message,status:false});
    });
   
  };

  const logout = (onLogout: Function) => {
    LoginService.logout(user.username).then(() => {
      setUser(null);
      onLogout();
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context == null) throw new Error('Missing AuthProvider');
  return context;
}
