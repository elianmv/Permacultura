const LoginService = {
<<<<<<< HEAD
  login: (username, password) => {
    const options = {
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };

    return fetch('/login', options)
=======
  login: (email, password) => {
    const options = {
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };
  
    return fetch('http://127.0.0.1:8080/api/v1/login', options)
>>>>>>> origin/juan
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  },

<<<<<<< HEAD
  logout: (username) => {
    const options = {
      body: JSON.stringify({ username }),
=======
  logout: (email) => {
    const options = {
      body: JSON.stringify({ email }),
>>>>>>> origin/juan
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };

    return fetch('/logout', options)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  },
};

<<<<<<< HEAD
export { LoginService };
=======
const RegisterService = {
  register: (userName, password,passwordConfirm,email, userType) => {
    const options = {
      body: JSON.stringify({ userName, password,passwordConfirm,email, userType }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };

    return fetch('http://127.0.0.1:8080/api/v1/register', options)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  },

  
   
  
};

export { LoginService, RegisterService };
>>>>>>> origin/juan
