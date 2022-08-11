import { createContext, useContext, useState } from 'react';
import { LoginService } from '../../services';

const AuthContext = createContext();

const initialState = null;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(initialState);

  const login = ({ username, password }, onLogin: Function) => {
    // LoginService.login(username, password).then((user) => {
    //   setUser(user);
    //   onLogin();
    // });
    setUser(username);
      onLogin();
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
