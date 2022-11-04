import { createContext, useContext, useState } from 'react';
<<<<<<< HEAD
import { LoginService } from '../../services';
=======
import { LoginService, RegisterService } from '../../services';
>>>>>>> origin/juan

const AuthContext = createContext();

const initialState = null;
<<<<<<< HEAD

export function AuthProvider({ children }) {
  const [user, setUser] = useState(initialState);

  const login = ({ username, password }, onLogin: Function) => {
    LoginService.login(username, password).then((user) => {
      setUser(user);
      onLogin();
    });
  };

=======
const initialStateUser = false;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(initialState);
  const [userLoggedIn, setUserLoggedIn] = useState(initialStateUser);
  const [userRegisteredIn, setUserRegisteredIn] = useState(initialStateUser);
  const[userName,setUserName] = useState('')

  const login = ({ username, password }, onLogin: Function) => {
    LoginService.login(username, password).then((result) => {
      console.log(result)
      if(result.message === 'Login Correcto'){
        setUser(result);
        setUserLoggedIn(true)
        
        onLogin({status:true, result });
        
        
      }
      else{
        setUserLoggedIn(false)
       
        onLogin({message:result.message,status:false});
      }
      
    });
   
  };

  const register = ({userName, password, passwordConfirm, email, userType }, onRegister: Function) => {
    RegisterService.register(userName, password, passwordConfirm, email, userType).then((result) => {
      if(!result.message){
        setUser(result);
        setUserRegisteredIn(true)
        onRegister({status:true});
      }
      setUserRegisteredIn(false)
      onRegister({message:result.message,status:false});
    });
   
  };


  

>>>>>>> origin/juan
  const logout = (onLogout: Function) => {
    LoginService.logout(user.username).then(() => {
      setUser(null);
      onLogout();
    });
  };

  return (
<<<<<<< HEAD
    <AuthContext.Provider value={{ user, login, logout }}>
=======
    <AuthContext.Provider value={{  user,
      login,
      logout,
      userLoggedIn,
      userName,
      setUser,
      user,
      setUserLoggedIn,
      register,}}>
>>>>>>> origin/juan
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context == null) throw new Error('Missing AuthProvider');
  return context;
}
